import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import { AuthServiceInterface } from '@src/application/services/authServicesInterface';
import { UserRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { AuthService, authService } from '@src/frameworks/services/authService';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
    blockUserUseCase,
    getAllUsersUseCase,
    unblockUserUseCase,
} from '@src/application/use-cases/management/userManagement';

const userController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImplementation: AuthService,
    userDbRepository: usersDbInterface,
    userDbRepositoryImplementation: UserRepositoryMongoDB,
) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());

    const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
        const users = await getAllUsersUseCase(dbRepositoryUser);
        res.status(200).json({
            status: 'Success',
            message: 'Successfully retrieved all user details',
            data: users,
        });
    });
    const blockUser = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const reason = req.body.reason;
        await blockUserUseCase(userId,reason, dbRepositoryUser);
        res.status(200).json({
            status: 'success',
            message: 'Successfully blocked user',
            data: null,
        });
    });
    const unblockUser = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        await unblockUserUseCase(userId, dbRepositoryUser);
        res.status(200).json({
            status: 'success',
            message: 'Successfully Unblocked User',
            data: null,
        });
    });
    return {
        getAllUsers,
        blockUser,
        unblockUser,
    };
};

export default userController;
