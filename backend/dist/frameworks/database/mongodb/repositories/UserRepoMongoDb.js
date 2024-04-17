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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepositoryMongoDB = () => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new userModel_1.default(user);
        return yield newUser.save();
    });
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email });
        return user;
    });
    const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
        return user;
    });
    const changePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { password });
    });
    const updateProfile = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedProfile = yield userModel_1.default.updateOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
        }, Object.assign({}, userInfo));
        return updatedProfile;
    });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userModel_1.default.find({});
        return users;
    });
    const blockUser = (id, reason) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.updateOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
        }, { isBlocked: true, blockedReason: reason });
    });
    const unblockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { isBlocked: false, blockedReason: '' });
    });
    const getAllBlockedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const blockedUsers = yield userModel_1.default.find({ isBlocked: true });
        return blockedUsers;
    });
    const getTotalNumberofUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        const total = yield userModel_1.default.find().count();
        return total;
    });
    const searchAvailableUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userModel_1.default.aggregate([
            {
                $match: {
                    _id: {
                        $ne: new mongoose_1.default.Types.ObjectId(userId)
                    }
                }
            }, {
                $project: {
                    profilePic: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1
                }
            }
        ]);
        return users;
    });
    const searchUser = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
        const regexExp = new RegExp(searchQuery, 'i');
        const users = yield userModel_1.default.find({
            $or: [{ firstName: { $regex: regexExp } }, { lastName: { $regex: regexExp } }],
        });
        console.log(users);
        return users;
    });
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
exports.userRepositoryMongoDB = userRepositoryMongoDB;
//# sourceMappingURL=UserRepoMongoDb.js.map