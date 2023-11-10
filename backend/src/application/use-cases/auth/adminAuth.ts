import { AdminDbInterface } from "@src/application/repositories/adminDBRepository";
import { RefreshTokenDbInterface } from "@src/application/repositories/refreshTokenDBRepository";
import { AuthServiceInterface } from "@src/application/services/authServicesInterface";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { AdminSavedDbInterface } from "@src/types/adminAuthInterface";
import { JwtPayload } from "@src/types/common";
import AppError from "@src/utils/appError";

export const adminLogin=async(
    email:string,
    password:string,
    adminRepository:ReturnType<AdminDbInterface>,
    refreshTokenRepository:ReturnType<RefreshTokenDbInterface>,
    authService:ReturnType<AuthServiceInterface>
)=>{
    const admin:AdminSavedDbInterface|null=await adminRepository.getAdminByEmail(email);
    if(!admin){
        throw new AppError('Admin not found...!',HttpStatusCodes.UNAUTHORIZED);
    }
    const isPasswordCorrect=await authService.comparePassword(password,admin.password);
    if(!isPasswordCorrect){
        throw new AppError('Sorry,your password is incorrect,Please try again',HttpStatusCodes.UNAUTHORIZED);
    }

    const payload:JwtPayload={
        Id: admin._id,
        email: admin.email,
        role: 'admin'
    }
    await refreshTokenRepository.deleteRefreshToken(admin._id)
    const accessToken=authService.generateToken(payload);
    const refreshToken=authService.generateRefreshToken(payload);
    const expirationDate=authService.decodedTokenAndReturnExpireDate(refreshToken);

    await refreshTokenRepository.saveRefreshToken(
        admin._id,
        refreshToken,
        expirationDate
    );
    return{
        accessToken,
        refreshToken
    }
}
