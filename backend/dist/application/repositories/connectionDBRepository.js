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
exports.connectionDbRepository = void 0;
const connectionDbRepository = (repository) => {
    const followUser = (userId, followeeUserId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.followUser(userId, followeeUserId); });
    const unfollowUser = (userId, followeeUserId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.unfollowUser(userId, followeeUserId); });
    const getFullUserList = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.connectionByUser(userId); });
    return {
        followUser,
        unfollowUser,
        getFullUserList,
    };
};
exports.connectionDbRepository = connectionDbRepository;
//# sourceMappingURL=connectionDBRepository.js.map