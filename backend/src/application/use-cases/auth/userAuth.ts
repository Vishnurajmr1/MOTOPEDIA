import { RefreshTokenDbInterface } from '@src/application/repositories/refreshTokenDBRepository';
import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import { AuthServiceInterface } from '@src/application/services/authServicesInterface';
import { GoogleAuthServiceInterface } from '@src/application/services/googleAuthServicesInterface';
import { SendEmailServiceInterface } from '@src/application/services/sendEmailInterface';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { JwtPayload } from '@src/types/common';
import { UserInterface } from '@src/types/userInterface';
import { UserRegisterInterface } from '@src/types/userRegisterInterface';
import AppError from '@src/utils/appError';
import generateOtp from '@src/utils/generateOtp';
import { resetPassEmailTemplate } from '@src/utils/templates/resetPassword';
import { verifyEmailTemplate } from '@src/utils/templates/verifyEmail';

export const userRegister = async (
    user: UserRegisterInterface,
    userRepository: ReturnType<usersDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
    sendEmailService: ReturnType<SendEmailServiceInterface>,
) => {
    user.email = user?.email?.toLowerCase();

    const isEmailAlreadyRegistered = await userRepository.getUserByEmail(user.email);

    if (isEmailAlreadyRegistered) {
        throw new AppError('User with same email already exists...!', HttpStatusCodes.CONFLICT);
    }
    if (user.password) {
        user.password = await authService.hashPassword(user.password);
    }
    const otp: string = generateOtp();
    const emailTempalte = verifyEmailTemplate(otp);
    const result = await sendEmailService.sendEmail({
        to: user.email,
        subject: 'Motopedia-verification',
        text: emailTempalte.text,
        html: emailTempalte.html,
    });
    if (!result) {
        throw new AppError('OOps something went wrong!Please try again later!', HttpStatusCodes.BAD_REQUEST);
    }
    user.isVerifiedEmail = false;
    user.otp = otp;
    const userData = await userRepository.addUser(user);
    return { userData };
};

export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<usersDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const user: UserInterface | null = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new AppError("This user doesn't exist", HttpStatusCodes.NOT_FOUND);
    }

    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new AppError('Sorry,your password is incorrect.Please try again', HttpStatusCodes.UNAUTHORIZED);
    }
    if (!user.isVerifiedEmail) {
        throw new AppError(
            'Sorry your email is not verified.Please signup and verify your email',
            HttpStatusCodes.UNAUTHORIZED,
        );
    }
    if(user.isBlocked){
        throw new AppError('You are blocked by our admin.Contact us for enquiry',HttpStatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS);
    }

    const payload: JwtPayload = {
        Id: user._id,
        email: user.email,
        role: 'user',
    };
    await refreshTokenRepository.deleteRefreshToken(user._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    await refreshTokenRepository.saveRefreshToken(user._id, refreshToken, expiratonDate);
    return { accessToken, refreshToken,user };
};

export const resendOtp = async (
    email: string,
    userRepository: ReturnType<usersDbInterface>,
    sendEmailService: ReturnType<SendEmailServiceInterface>,
) => {
    const user: UserInterface | null = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new AppError('Email not registered!Please signup', HttpStatusCodes.BAD_REQUEST);
    }
    if (user.isVerifiedEmail) {
        throw new AppError('Email already verified', HttpStatusCodes.BAD_REQUEST);
    }
    const otp: string = generateOtp();
    const emailTemplate = verifyEmailTemplate(otp);
    const result = await sendEmailService.sendEmail({
        to: user.email,
        subject: 'Motopedia-verification',
        text: emailTemplate.text,
        html: emailTemplate.html,
    });
    if (!result) {
        throw new AppError('OOps something went wrong!Please try again later!', HttpStatusCodes.BAD_REQUEST);
    }
    user.otp = otp;
    await userRepository.updateProfile(user._id, {
        otp: user.otp,
    });
};

export const verifyOtp = async (
    email: string,
    otp: string,
    authService: ReturnType<AuthServiceInterface>,
    userRepository: ReturnType<usersDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
) => {
    const user: UserInterface | null = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new AppError('Email not registerd!Please signup', HttpStatusCodes.BAD_REQUEST);
    }

    if (user && user.isVerifiedEmail) {
        throw new AppError('Email already verified', HttpStatusCodes.BAD_REQUEST);
    }

    if (otp !== user.otp) {
        throw new AppError('Invalid OTP.Please check your OTP and try again.', HttpStatusCodes.BAD_REQUEST);
    }
    user.otp = null;
    user.isVerifiedEmail = true;
    await userRepository.updateProfile(user._id, {
        isVerifiedEmail: user.isVerifiedEmail,
        otp: user.otp,
    });
    const payload: JwtPayload = {
        Id: user._id,
        email,
        role: 'user',
    };
    await refreshTokenRepository.deleteRefreshToken(user._id);
    const accessToken =authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    await refreshTokenRepository.saveRefreshToken(user._id, refreshToken, expiratonDate);
    return { accessToken, refreshToken, user };
};

export const signInWithGoogle = async (
    credential: string,
    googleAuthService: ReturnType<GoogleAuthServiceInterface>,
    userRepository: ReturnType<usersDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const user = await googleAuthService.verify(credential);
    const isUserExist = await userRepository.getUserByEmail(user.email);

    if (isUserExist) {
        const payload: JwtPayload = {
            Id: isUserExist._id,
            email: isUserExist.email,
            role: 'user',
        };
        await refreshTokenRepository.deleteRefreshToken(isUserExist._id);
        const accessToken = authService.generateToken(payload);
        const refreshToken = authService.generateRefreshToken(payload);
        const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
        await refreshTokenRepository.saveRefreshToken(isUserExist._id, refreshToken, expiratonDate);
        return { accessToken, refreshToken };
    } else {
        const { _id: userId, email } = await userRepository.addUser(user);
        const payload: JwtPayload = { Id: userId, email, role: 'user' };
        const accessToken = authService.generateToken(payload);
        const refreshToken = authService.generateRefreshToken(payload);
        const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
        await refreshTokenRepository.saveRefreshToken(userId, refreshToken, expiratonDate);
        return { accessToken, refreshToken };
    }
};
export const resetPassword = async (
    email: string,
    authService: ReturnType<AuthServiceInterface>,
    userRepository: ReturnType<usersDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    sendEmailService: ReturnType<SendEmailServiceInterface>,
) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new AppError('Email not registered!Please signup', HttpStatusCodes.BAD_REQUEST);
    }
    const payload: JwtPayload = {
        Id: user._id,
        email: user?.email,
        role: 'user',
    };
    await refreshTokenRepository.deleteRefreshToken(user._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expiratonDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    const emailTemplate = resetPassEmailTemplate(refreshToken);
    const result = await sendEmailService.sendEmail({
        to: user.email,
        subject: 'Motopedia-Reset Password',
        text: emailTemplate.text,
        html: emailTemplate.html,
    });
    if (!result) {
        throw new AppError('OOps something went wrong!Please try again later!', HttpStatusCodes.BAD_REQUEST);
    }
    // return { accessToken, refreshToken };
};
