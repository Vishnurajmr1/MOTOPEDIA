import { Request, Response, response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface } from '../../application/services/authServicesInterface';
import { AdminDbInterface } from '../../application/repositories/adminDBRepository';
import { usersDbInterface } from '../../application/repositories/userDBRepository';
import {
    ResetPasswordToken,
    confirmNewPassword,
    resendOtp,
    resetPassword,
    signInWithGoogle,
    userLogin,
    userRegister,
    verifyOtp,
} from '../../application/use-cases/auth/userAuth';
import { UserRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { AdminRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { RefreshTokenDbInterface } from '../../application/repositories/refreshTokenDBRepository';
import { RefreshTokenRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { UserRegisterInterface } from '../../types/userRegisterInterface';
import { adminLogin } from '../../application/use-cases/auth/adminAuth';
import { SendEmailServiceInterface } from '../../application/services/sendEmailInterface';
import { SendEmailService } from '../../frameworks/services/sendEmailService';
import { GoogleAuthServiceInterface } from '../../application/services/googleAuthServicesInterface';
import { GoogleAuthService } from '../../frameworks/services/googleAuthService';
import Status from '../../constants/HttResponseStatus';
const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImplementation: AuthService,
    userDbRepository: usersDbInterface,
    userDbRepositoryImplementation: UserRepositoryMongoDB,
    adminDbRepository: AdminDbInterface,
    adminDbRepositoryImplementation: AdminRepositoryMongoDb,
    refreshTokenDbRepository: RefreshTokenDbInterface,
    refreshTokenDbRepositoryImplementation: RefreshTokenRepositoryMongoDB,
    sendEmailInterface: SendEmailServiceInterface,
    sendEmailImplementation: SendEmailService,
    googleAuthInterface: GoogleAuthServiceInterface,
    googleAuthImplementation: GoogleAuthService,
) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImplementation());
    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenDbRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    const emailService = sendEmailInterface(sendEmailImplementation());
    const googleAuthService = googleAuthInterface(googleAuthImplementation());
    const registerUser = asyncHandler(async (req: Request, res: Response) => {
        const user: UserRegisterInterface = req.body;
        const { userData } = await userRegister(
            user,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
            emailService,
        );
        res.status(200).json({
            status: 'success',
            message: `Email verification otp send successfully to ${userData.email}`,
            data:userData,
        });
    });

    const loginUser = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string; password: string } = req.body;
        const { accessToken, refreshToken, user } = await userLogin(
            email,
            password,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data:{accessToken,refreshToken,user}
        });
    });
    const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string; password: string } = req.body;
        const { accessToken, refreshToken } = await adminLogin(
            email,
            password,
            dbRepositoryAdmin,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in',
            data:{accessToken,refreshToken}
        });
    });
    const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
        const { credential }: { credential: string } = req.body;
        const { accessToken, refreshToken } = await signInWithGoogle(
            credential,
            googleAuthService,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in with google',
           data:{accessToken,refreshToken}
        });
    });
    const verifyUserEmail = asyncHandler(async (req: Request, res: Response) => {
        const { email, otp }: { email: string; otp: string } = req.body;
        const { accessToken, refreshToken, user } = await verifyOtp(
            email,
            otp,
            authService,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
        );
        res.status(200).json({
            status: 'success',
            message: 'OTP verified successfully',
            data:{accessToken,refreshToken,user}
        });
    });
    const resendOtpverify = asyncHandler(async (req: Request, res: Response) => {
        const { email }: { email: string } = req.body;
        await resendOtp(email, dbRepositoryUser, emailService);
        res.status(200).json({
            status: 'success',
            message: `Email verification otp send successfully to ${email}`,
            data:null
        });
    });

    const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email }: { email: string } = req.body;
        await resetPassword(email, authService, dbRepositoryUser, dbRepositoryRefreshToken, emailService);
        res.status(200).json({
            status: 'success',
            message: `Please reset new Password using the link provied to ${email}`,
            data:null
        });
    });
    const resetPasswordByEmail = asyncHandler(async (req: Request, res: Response) => {
        const { token }: { token: string } = req.body;
        await ResetPasswordToken(token, authService, dbRepositoryUser, dbRepositoryRefreshToken);
        res.status(200).json({
            status: 'success',
            message: 'Please reset the password',
            data:null
        });
    });
    const confirmPassword = asyncHandler(async (req: Request, res: Response) => {
        const { token, newPassword } = req.body;
        await confirmNewPassword(token, newPassword, authService, dbRepositoryUser);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Password reset successfully completed',
            data:null
        });
    });

    const logoutUser = asyncHandler(async (req: Request, res: Response) => {
        res.status(200).json({
            status: 'success',
            message: `Logout successfully`,
            data:null
        });
    });
    return {
        registerUser,
        loginAdmin,
        loginUser,
        verifyUserEmail,
        resendOtpverify,
        logoutUser,
        loginWithGoogle,
        forgotPassword,
        resetPasswordByEmail,
        confirmPassword,
    };
};

export default authController;
