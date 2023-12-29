import { ConnectionRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/connectionRepoMongoDb';

export const connectionDbRepository = (repository: ReturnType<ConnectionRepositoryMongoDB>) => {
    const followUser = async (userId: string, followeeUserId: string) =>
        await repository.followUser(userId, followeeUserId);
    const unfollowUser = async (userId: string, followeeUserId: string) =>
        await repository.unfollowUser(userId, followeeUserId);
    const getFullUserList = async (userId: string) => await repository.connectionByUser(userId);
    return {
        followUser,
        unfollowUser,
        getFullUserList,
    };
};

export type ConnectionDbRepositoryInterface = typeof connectionDbRepository;
