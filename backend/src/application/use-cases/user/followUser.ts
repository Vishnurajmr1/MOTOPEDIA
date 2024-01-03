import { ConnectionDbRepositoryInterface } from '@src/application/repositories/connectionDBRepository';
import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { UserUpdateInfo } from '@src/types/userInterface';
import AppError from '../../../utils/appError';

export const followUserUseCase = async (
    currentUserId: string | undefined,
    followerId: string | undefined,
    connectionDbRepository: ReturnType<ConnectionDbRepositoryInterface>,
) => {
    if (!currentUserId || !followerId) {
        throw new AppError('Please provide a valid id', HttpStatusCodes.BAD_REQUEST);
    }
    if (currentUserId === followerId) {
        throw new AppError('Action not possible', HttpStatusCodes.CONFLICT);
    }
    const followUser = await connectionDbRepository.followUser(currentUserId, followerId);
    return followUser;
};
export const unfollowUserUseCase = async (
    currentUserId: string | undefined,
    followerId: string | undefined,
    connectionDbRepository: ReturnType<ConnectionDbRepositoryInterface>,
) => {
    if (!currentUserId || !followerId) {
        throw new AppError('Please provide a valid id', HttpStatusCodes.BAD_REQUEST);
    }
    if (currentUserId === followerId) {
        throw new AppError('Action not possible', HttpStatusCodes.CONFLICT);
    }
    const followUser = await connectionDbRepository.unfollowUser(currentUserId, followerId);
    return followUser;
};
export const getConnectionData = async (
    currentUserId: string | undefined,
    connectionDbRepository: ReturnType<ConnectionDbRepositoryInterface>,
) => {
    if (!currentUserId) {
        throw new AppError('Please provide a valid id', HttpStatusCodes.BAD_REQUEST);
    }
    const connectionData = await connectionDbRepository.getFullUserList(currentUserId);
    return connectionData;
};
