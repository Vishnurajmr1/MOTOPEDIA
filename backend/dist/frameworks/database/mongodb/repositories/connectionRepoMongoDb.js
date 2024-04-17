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
exports.connectionRepositoryMongoDB = void 0;
const connection_1 = __importDefault(require("../models/connection"));
const connectionRepositoryMongoDB = () => {
    const followUser = (userId, followeeUserId) => __awaiter(void 0, void 0, void 0, function* () {
        const userConnection = yield connection_1.default.findOneAndUpdate({ userId: userId }, { $addToSet: { following: followeeUserId } }, { upsert: true, new: true }).lean();
        const followeeConnection = yield connection_1.default.findOneAndUpdate({ userId: followeeUserId }, { $addToSet: { followers: userId } }, { upsert: true, new: true }).lean();
        return { userConnection, followeeConnection };
    });
    const unfollowUser = (userId, followeeUserId) => __awaiter(void 0, void 0, void 0, function* () {
        const userConnection = yield connection_1.default.findOneAndUpdate({ userId: userId }, { $pull: { following: followeeUserId } }, { new: true });
        const followeeConnection = yield connection_1.default.findOneAndUpdate({ userId: followeeUserId }, { $pull: { followers: userId } }, { new: true });
        return { userConnection, followeeConnection };
    });
    const connectionByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const connectionData = yield connection_1.default.find({ userId: userId }).populate({
            path: 'followers following',
            select: 'firstName lastName email mobile dateJoined profilePic',
        });
        return connectionData;
    });
    return {
        followUser,
        unfollowUser,
        connectionByUser,
    };
};
exports.connectionRepositoryMongoDB = connectionRepositoryMongoDB;
//# sourceMappingURL=connectionRepoMongoDb.js.map