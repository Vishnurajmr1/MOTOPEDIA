import { AdminDbInterface } from '../../../application/repositories/adminDBRepository';
import { RefreshTokenDbInterface } from '../../../application/repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '../../../application/services/authServicesInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { AdminSavedDbInterface } from '../../../types/adminAuthInterface';
import { JwtPayload } from '../../../types/common';
import AppError from '../../../utils/appError';

export const adminLogin = async (
    email: string,
    password: string,
    adminRepository: ReturnType<AdminDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const admin: AdminSavedDbInterface | null = await adminRepository.getAdminByEmail(email);
    if (!admin) {
        throw new AppError('Admin not found...!', HttpStatusCodes.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, admin.password);
    if (!isPasswordCorrect) {
        throw new AppError('Sorry,your password is incorrect,Please try again', HttpStatusCodes.UNAUTHORIZED);
    }
    const payload: JwtPayload = {
        Id: admin._id,
        email: admin.email,
        role: 'admin',
    };
    await refreshTokenRepository.deleteRefreshToken(admin._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

    await refreshTokenRepository.saveRefreshToken(admin._id, refreshToken, expirationDate);
    return {
        accessToken,
        refreshToken,
    };
};
