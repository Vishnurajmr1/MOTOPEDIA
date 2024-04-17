"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addUser(user); });
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserByEmail(email); });
    const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserById(id); });
    const changePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.changePassword(id, password); });
    const updateProfile = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateProfile(id, userInfo); });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllUsers(); });
    const blockUser = (id, reason) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.blockUser(id, reason); });
    const unblockUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.unblockUser(id); });
    const getAllBlockedUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllBlockedUsers(); });
    const getTotalNumberofUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTotalNumberofUsers(); });
    const searchUser = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.searchUser(searchQuery); });
    const searchAvailableUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.searchAvailableUsers(userId); });
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
exports.userDbRepository = userDbRepository;
//# sourceMappingURL=userDBRepository.js.map