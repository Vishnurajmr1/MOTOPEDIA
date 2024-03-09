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
import { CustomRequest } from '@src/types/customRequest';
import { editUserDetailsUseCase, getUserDetailUseCase } from '@src/application/use-cases/user/user';
import { followUserUseCase, getConnectionData, unfollowUserUseCase } from '@src/application/use-cases/user/followUser';
import Status from '@src/constants/HttResponseStatus';
import { ConnectionDbRepositoryInterface } from '@src/application/repositories/connectionDBRepository';
import { ConnectionRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/connectionRepoMongoDb';
import { UserUpdateInfo } from '@src/types/userInterface';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import { CloudServiceImpl } from '@src/frameworks/services/s3Service';
import { searchUserUseCase } from '@src/application/use-cases/user/search';

const userController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImplementation: AuthService,
    userDbRepository: usersDbInterface,
    userDbRepositoryImplementation: UserRepositoryMongoDB,
    connectionDbRepository: ConnectionDbRepositoryInterface,
    connectionDbRepositoryImplementation: ConnectionRepositoryMongoDB,
    cloudServiceInterface:CloudServiceInterface,
    cloudServiceImpl:CloudServiceImpl
) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    const dbRepositoryConnection = connectionDbRepository(connectionDbRepositoryImplementation());
    const cloudService=cloudServiceInterface(cloudServiceImpl());
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
        await blockUserUseCase(userId, reason, dbRepositoryUser);
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
    const getUserDetails = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const userDetails = await getUserDetailUseCase(userId, dbRepositoryUser);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved user details',
            userDetails,
        });
    });

    const editUserDetails=asyncHandler(async(req:CustomRequest,res:Response)=>{
        const userId:string|undefined=req.user?.Id;
        const userInfo:UserUpdateInfo=req.body;
        const profilePic:Express.Multer.File|null=req.file as Express.Multer.File;
        const updatedProfile=await editUserDetailsUseCase(
            userId,
            userInfo,
            profilePic,
            cloudService,
            authService,
            dbRepositoryUser
        )
        res.status(200).json({
            status:Status.SUCCESS,
            message:'Successfully updated the profile',
            data:updatedProfile
        })
    })
    const followUser = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const followUserId: string | undefined = req.params.id;
        const followUserDetails = await followUserUseCase(userId, followUserId, dbRepositoryConnection);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully followed the user',
            followUserDetails,
        });
    });
    const unfollowUser = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.user?.Id;
        const followUserId: string | undefined = req.params.id;
        const followUserDetails = await unfollowUserUseCase(userId, followUserId, dbRepositoryConnection);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully unfollowed the user',
            followUserDetails,
        });
    });
    const getConnections = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userId: string | undefined = req.query?.Id as string || req.user?.Id;
        const connectionData = await getConnectionData(userId,dbRepositoryConnection);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully retrieved user connection list',
            connectionData,
        });
    });
    const getOtherUserDetails=asyncHandler(async(req:Request,res:Response)=>{
        const userId=req.params.id;
        const userDetails=await getUserDetailUseCase(userId,dbRepositoryUser);
        res.status(200).json({
            status:Status.SUCCESS,
            message:"Successfully retrieved other user details",
            userDetails
        })
    })
    const searchUser=asyncHandler(async(req:Request,res:Response)=>{
        const search=req.query.search as string;
        console.log(req.query)
        const searchResult=await searchUserUseCase(
            search,
            dbRepositoryUser
        )
        res.status(200).json({
            status:Status.SUCCESS,
            message:'Successfully retrieved users based on the search query',
            data:searchResult
        })
    })
    
    return {
        getAllUsers,
        blockUser,
        unblockUser,
        getUserDetails,
        followUser,
        unfollowUser,
        getConnections,
        editUserDetails,
        searchUser,
        getOtherUserDetails,
    };
};

export default userController;
