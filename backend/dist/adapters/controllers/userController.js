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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userManagement_1 = require("../../application/use-cases/management/userManagement");
const user_1 = require("../../application/use-cases/user/user");
const followUser_1 = require("../../application/use-cases/user/followUser");
const HttResponseStatus_1 = __importDefault(require("../../constants/HttResponseStatus"));
const search_1 = require("../../application/use-cases/user/search");
const userController = (authServiceInterface, authServiceImplementation, userDbRepository, userDbRepositoryImplementation, connectionDbRepository, connectionDbRepositoryImplementation, cloudServiceInterface, cloudServiceImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    const dbRepositoryConnection = connectionDbRepository(connectionDbRepositoryImplementation());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, userManagement_1.getAllUsersUseCase)(dbRepositoryUser);
        res.status(200).json({
            status: 'Success',
            message: 'Successfully retrieved all user details',
            data: users,
        });
    }));
    const blockUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        const reason = req.body.reason;
        yield (0, userManagement_1.blockUserUseCase)(userId, reason, dbRepositoryUser);
        res.status(200).json({
            status: 'success',
            message: 'Successfully blocked user',
            data: null,
        });
    }));
    const unblockUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        yield (0, userManagement_1.unblockUserUseCase)(userId, dbRepositoryUser);
        res.status(200).json({
            status: 'success',
            message: 'Successfully Unblocked User',
            data: null,
        });
    }));
    const getUserDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        const userDetails = yield (0, user_1.getUserDetailUseCase)(userId, dbRepositoryUser);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved user details',
            data: userDetails,
        });
    }));
    const editUserDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        const userInfo = req.body;
        const profilePic = req.file;
        const updatedProfile = yield (0, user_1.editUserDetailsUseCase)(userId, userInfo, profilePic, cloudService, authService, dbRepositoryUser);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully updated the profile',
            data: updatedProfile
        });
    }));
    const followUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.Id;
        const followUserId = req.params.id;
        const followUserDetails = yield (0, followUser_1.followUserUseCase)(userId, followUserId, dbRepositoryConnection);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully followed the user',
            data: followUserDetails,
        });
    }));
    const unfollowUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.Id;
        const followUserId = req.params.id;
        const followUserDetails = yield (0, followUser_1.unfollowUserUseCase)(userId, followUserId, dbRepositoryConnection);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully unfollowed the user',
            data: followUserDetails,
        });
    }));
    const getConnections = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        const userId = ((_e = req.query) === null || _e === void 0 ? void 0 : _e.Id) || ((_f = req.user) === null || _f === void 0 ? void 0 : _f.Id);
        const connectionData = yield (0, followUser_1.getConnectionData)(userId, dbRepositoryConnection);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully fetched user connection list',
            data: connectionData,
        });
    }));
    const getOtherUserDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const userDetails = yield (0, user_1.getUserDetailUseCase)(userId, dbRepositoryUser);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: "Successfully fetched other user details",
            data: userDetails
        });
    }));
    const searchUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const search = req.query.search;
        console.log(req.query);
        const searchResult = yield (0, search_1.searchUserUseCase)(search, dbRepositoryUser);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully fetched users based on the search query',
            data: searchResult
        });
    }));
    const searchAvailableUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h;
        const userId = ((_g = req.query) === null || _g === void 0 ? void 0 : _g.Id) || ((_h = req.user) === null || _h === void 0 ? void 0 : _h.Id);
        const users = yield (0, search_1.getAvailableUsersUsingSearch)(userId, dbRepositoryUser);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully fetched user connection list',
            data: users,
        });
    }));
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
        searchAvailableUsers
    };
};
exports.default = userController;
//# sourceMappingURL=userController.js.map