import AppError from '@src/utils/appError';
import { usersDbInterface } from '../repositories/userDBRepository';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { UserInterface } from '@src/types/userInterface';

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
