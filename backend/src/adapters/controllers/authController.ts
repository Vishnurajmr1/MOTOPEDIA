import { Request, Response, response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthService } from '@src/frameworks/services/authService';
import { AuthServiceInterface } from '@src/application/services/authServicesInterface';
import { AdminDbInterface } from '@src/application/repositories/adminDBRepository';
import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import { resendOtp, userLogin, userRegister, verifyOtp } from '@src/application/use-cases/auth/userAuth';
import { UserRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { AdminRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { RefreshTokenDbInterface } from '@src/application/repositories/refreshTokenDBRepository';
import { RefreshTokenRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { UserRegisterInterface } from '@src/types/userRegisterInterface';
import { adminLogin } from '@src/application/use-cases/auth/adminAuth';
import { SendEmailServiceInterface } from '@src/application/services/sendEmailInterface';
import { SendEmailService } from '@src/frameworks/services/sendEmailService';
const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImplementation: AuthService,
    userDbRepository: usersDbInterface,
    userDbRepositoryImplementation: UserRepositoryMongoDB,
    adminDbRepository: AdminDbInterface,
    adminDbRepositoryImplementation: AdminRepositoryMongoDb,
    refreshTokenDbRepository: RefreshTokenDbInterface,
    refreshTokenDbRepositoryImplementation: RefreshTokenRepositoryMongoDB,
    sendEmailInterface:SendEmailServiceInterface,
    sendEmailImplementation:SendEmailService
) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImplementation());
    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenDbRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    const emailService=sendEmailInterface(sendEmailImplementation());
    const registerUser = asyncHandler(async (req: Request, res: Response) => {
        const user: UserRegisterInterface = req.body;
        const { userData } = await userRegister(
            user,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
            emailService
        );
        res.status(200).json({
            status: 'success',
            message: `Email verification otp send successfully to ${userData.email}`,
            userData
        });
    });

    const loginUser = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string; password: string } = req.body;
        const { accessToken, refreshToken } = await userLogin(
            email,
            password,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            accessToken,
            refreshToken,
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
            accessToken,
            refreshToken,
        });
    });
    const verifyUserEmail=asyncHandler(async(req:Request,res:Response)=>{
        const {email,otp}:{email:string,otp:string}=req.body;
         const {accessToken,refreshToken}=await verifyOtp(
            email,
            otp,
            authService,
            dbRepositoryUser,
            dbRepositoryRefreshToken
         )
         res.status(200).json({
            status: 'success',
            message: 'OTP verified successfully',
            accessToken,
            refreshToken,
        });
    })
    const resendOtpverify=asyncHandler(async(req:Request,res:Response)=>{
        const {email}:{email:string}=req.body;
        await resendOtp(
            email,
            authService,
            dbRepositoryUser,
            emailService
        );
        res.status(200).json({
            status: 'success',
            message: `Email verification otp send successfully to ${email}`,
        });
    })
    return {
        registerUser,
        loginAdmin,
        loginUser,
        verifyUserEmail,
        resendOtpverify
    };
};

export default authController;
