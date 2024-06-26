import { UserRegisterInterface } from '../../../../types/userRegisterInterface';
import mongoose from 'mongoose';
import User from '../models/userModel';
import { UserInterface, UserUpdateInfo } from '../../../../types/userInterface';

export const userRepositoryMongoDB = () => {
    const addUser = async (user: UserRegisterInterface) => {
        const newUser = new User(user);
        return await newUser.save();
    };
    const getUserByEmail = async (email: string): Promise<UserInterface | null> => {
        const user: UserInterface | null = await User.findOne({ email });
        return user;
    };
    const getUserById = async (id: string): Promise<UserInterface | null> => {
        const user: UserInterface | null = await User.findOne({
            _id: new mongoose.Types.ObjectId(id),
        });
        return user;
    };

    const changePassword = async (id: string, password: string): Promise<void> => {
        await User.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { password });
    };
    const updateProfile = async (id: string, userInfo: UserUpdateInfo) => {
        const updatedProfile = await User.updateOne(
            {
                _id: new mongoose.Types.ObjectId(id),
            },
            { ...userInfo },
        );
        return updatedProfile
    };
    const getAllUsers = async () => {
        const users: UserInterface[] | null = await User.find({});
        return users;
    };
    const blockUser = async (id: string, reason: string): Promise<void> => {
        await User.updateOne(
            {
                _id: new mongoose.Types.ObjectId(id),
            },
            { isBlocked: true, blockedReason: reason },
        );
    };
    const unblockUser = async (id: string): Promise<void> => {
        await User.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { isBlocked: false, blockedReason: '' });
    };
    const getAllBlockedUsers = async (): Promise<UserInterface[] | null> => {
        const blockedUsers: UserInterface[] | null = await User.find({ isBlocked: true });
        return blockedUsers;
    };
    const getTotalNumberofUsers = async () => {
        const total = await User.find().count();
        return total;
    };
    const searchAvailableUsers=async(userId:string)=>{
        const users=await User.aggregate([
            {
                $match:{
                    _id:{
                        $ne:new mongoose.Types.ObjectId(userId)
                    }
                }
            },{
                $project:{
                    profilePic:1,
                    firstName:1,
                    lastName:1,
                    email:1
                }
            }
        ])
        return users;
    }
    const searchUser = async (searchQuery: string) => {
        const regexExp = new RegExp(searchQuery, 'i');
        const users = await User.find({
            $or: [{ firstName: { $regex: regexExp } }, { lastName: { $regex: regexExp } }],
        });
        console.log(users);
        return users;
    };

    return {
        addUser,
        getUserByEmail,
        getUserById,
        getAllUsers,
        blockUser,
        unblockUser,
        changePassword,
        updateProfile,
        getAllBlockedUsers,
        getTotalNumberofUsers,
        searchUser,
        searchAvailableUsers
    };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
