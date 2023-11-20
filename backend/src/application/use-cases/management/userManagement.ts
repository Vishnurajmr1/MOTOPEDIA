import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { UserInterface } from '@src/types/userInterface';
import AppError from '@src/utils/appError';

export const getAllUsersUseCase = async (userRepository: ReturnType<usersDbInterface>) => {
    const users: UserInterface[] | null = await userRepository.getAllUsers();
    return users;
};

export const blockUserUseCase = async (
    userId:string,
    reason:string,
    userRepository: ReturnType<usersDbInterface>) => {
        if(!userId){
            throw new AppError('Invalid student details',HttpStatusCodes.BAD_REQUEST)
        }
        if(!reason){
            throw new AppError('Please provide a reason to block the user',HttpStatusCodes.BAD_REQUEST)
        }
        const user=await userRepository.getUserById(userId);
        if(user?.isBlocked){
            throw new AppError('Already Blocked this user',HttpStatusCodes.CONFLICT)
        }
};
