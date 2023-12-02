import { ConnectionRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/connectionRepoMongoDb';

export const connectionDbRepository = (repository: ReturnType<ConnectionRepositoryMongoDB>) => {
    const followUser = async (userId: string, followeeUserId: string) =>
        await repository.followUser(userId, followeeUserId);
    const unfollowUser = async (userId: string, followeeUserId: string) =>
        await repository.unfollowUser(userId, followeeUserId);
    return {
        followUser,
        unfollowUser,
    };
};

export type ConnectionDbRepositoryInterface = typeof connectionDbRepository;
