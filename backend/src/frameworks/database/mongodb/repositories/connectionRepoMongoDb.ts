import mongoose from 'mongoose';
import Connection from '../models/connection';
import { ConnectionInterface } from '@src/types/connectionInterface';

export const connectionRepositoryMongoDB = () => {

    
    const followUser = async (userId: string, followeeUserId: string) => {
    const userConnection:ConnectionInterface|null = await Connection.findOneAndUpdate(
        { userId: userId },
        { $addToSet: { following: followeeUserId } },
        { upsert: true, new: true },
    ).lean();
    const followeeConnection:ConnectionInterface|null = await Connection.findOneAndUpdate(
        { userId: followeeUserId },
        { $addToSet: { followers: userId } },
        { upsert: true, new: true },
    ).lean();
    return { userConnection, followeeConnection };
};
const unfollowUser = async (userId: string, followeeUserId: string) => {
    const userConnection = await Connection.findOneAndUpdate(
        { userId: userId },
        { $pull: { following: followeeUserId } },
        { new: true },
    );
    const followeeConnection = await Connection.findOneAndUpdate(
        { userId: followeeUserId },
        { $pull: { followers: userId } },
        { new: true },
        );
        return { userConnection, followeeConnection };
    };
    return{
        followUser,
        unfollowUser
    }
};
export type ConnectionRepositoryMongoDB = typeof connectionRepositoryMongoDB;
