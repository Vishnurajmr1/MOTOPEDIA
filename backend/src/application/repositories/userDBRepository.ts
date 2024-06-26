import { UserRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { UserUpdateInfo } from '../../types/userInterface';
import { UserRegisterInterface } from '../../types/userRegisterInterface';

export const userDbRepository = (repository: ReturnType<UserRepositoryMongoDB>) => {
    const addUser = async (user: UserRegisterInterface) => await repository.addUser(user);

    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email);

    const getUserById = async (id: string) => await repository.getUserById(id);

    const changePassword = async (id: string, password: string) => await repository.changePassword(id, password);

    const updateProfile = async (id: string, userInfo: UserUpdateInfo) => await repository.updateProfile(id, userInfo);

    const getAllUsers = async () => await repository.getAllUsers();

    const blockUser = async (id: string, reason: string) => await repository.blockUser(id, reason);

    const unblockUser = async (id: string) => await repository.unblockUser(id);

    const getAllBlockedUsers = async () => await repository.getAllBlockedUsers();

    const getTotalNumberofUsers = async () => await repository.getTotalNumberofUsers();

    const searchUser = async (searchQuery: string) => await repository.searchUser(searchQuery);

    const searchAvailableUsers=async(userId:string)=>await repository.searchAvailableUsers(userId);

    return {
        addUser,
        getUserByEmail,
        getUserById,
        updateProfile,
        changePassword,
        getAllUsers,
        blockUser,
        unblockUser,
        getAllBlockedUsers,
        getTotalNumberofUsers,
        searchUser,
        searchAvailableUsers
    };
};

export type usersDbInterface = typeof userDbRepository;
