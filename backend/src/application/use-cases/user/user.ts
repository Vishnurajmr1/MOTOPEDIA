import AppError from '../../../utils/appError';
import { usersDbInterface } from '../../repositories/userDBRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { UserInterface, UserUpdateInfo } from '../../../types/userInterface';
import { ConnectionDbRepositoryInterface } from '../../repositories/connectionDBRepository';
import { AuthServiceInterface } from '../../services/authServicesInterface';
import User from '../../../frameworks/database/mongodb/models/userModel';
import { CloudServiceInterface } from '../../services/cloudServiceInterface';

export const getUserDetailUseCase = async (id: string | undefined, userDbRepository: ReturnType<usersDbInterface>) => {
    if (!id) {
        throw new AppError('Please provide a valid user id', HttpStatusCodes.BAD_REQUEST);
    }

    const userDetails: UserInterface | null = await userDbRepository.getUserById(id);

    if (userDetails) {
        userDetails.password = 'no password';
    }
    return userDetails;
};

export const editUserDetailsUseCase = async (
    id: string | undefined,
    userData: UserUpdateInfo,
    profilePic: Express.Multer.File,
    cloudService: ReturnType<CloudServiceInterface>,
    authService: ReturnType<AuthServiceInterface>,
    userDbRepository: ReturnType<usersDbInterface>,
) => {
    if (!id) {
        throw new AppError('Please provide a valid user id', HttpStatusCodes.BAD_REQUEST);
    }
    const userDetails: UserInterface | null = await userDbRepository.getUserById(id);
    
    let query: object = {};
    if (profilePic) {
        const response = await cloudService.upload(profilePic, 'Profile_photo');
        query['profilePic'] = response;
    } else {
        if (!userData.currentPassword) {
        throw new AppError('Current Password is required', HttpStatusCodes.BAD_REQUEST);
    }
        query = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            mobile: userData.mobile,
        };
        if (Object.keys(userData).length === 0) {
            throw new AppError('At least update a single field', HttpStatusCodes.BAD_REQUEST);
        }
        if (userData && userDetails) {
            const checkPassword = await authService.comparePassword(userData.currentPassword, userDetails.password);
            if (!checkPassword) {
                throw new AppError('Current Password is incorrect', HttpStatusCodes.BAD_REQUEST);
            }
            if (userData.password) {
                const newPassword = await authService.hashPassword(userData.password);
                query['password'] = newPassword;
            }
        }
    }
    const updatedProfile = await userDbRepository.updateProfile(userDetails?._id as string, query);
    return updatedProfile;
};
