import { RefreshTokenDbInterface } from "@src/application/repositories/refreshTokenDBRepository";
import { usersDbInterface } from "@src/application/repositories/userDBRepository";
import { AuthServiceInterface } from "@src/application/services/authServiceInterface";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { UserRegisterInterface } from "@src/types/userRegisterInterface";
import AppError from "@src/utils/appError";

export const userRegister=async(
    user:UserRegisterInterface,
    userRepository:ReturnType<usersDbInterface>,
    refreshTokenRepository:ReturnType<RefreshTokenDbInterface>,
    authService:ReturnType<AuthServiceInterface>
)=>{
    user.email=user?.email?.toLowerCase();

    const isEmailAlreadyRegistered=await userRepository.getUserByEmail(user.email);

    if(isEmailAlreadyRegistered){
        throw new AppError('User with same email already exists...!',HttpStatusCodes.CONFLICT);
    }
    if(user.password){
        user.password=await authService.hashPassword(user.password);
    }
    const{_id:userId,email}=await userRepository.addUser(user);
    const payload={
        Id:userId,
        email,
        role:'user'
    }

    const accessToken=authService.generateToken(payload);
    const refreshToken=authService.generateRefreshToken(payload);
    const expiratonDate=authService.decodedTokenAndReturnExpireDate(refreshToken);

    await refreshTokenRepository.saveRefreshToken(
        userId,
        refreshToken,
        expiratonDate
    )

}