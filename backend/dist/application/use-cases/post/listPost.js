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
exports.getPostsByFollowersUseCase = exports.getPostByUserUseCase = exports.getAllPostsUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const getAllPostsUseCase = (cloudService, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postDbRepository.getAllPosts();
    yield Promise.all(posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        if (post.image) {
            post.imageUrl = yield cloudService.getFile(post.image.key);
        }
    })));
    return posts;
});
exports.getAllPostsUseCase = getAllPostsUseCase;
const getPostByUserUseCase = (userId, cloudService, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new appError_1.default('Invalid user Id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const posts = yield postDbRepository.getPostByUser(userId);
    if (posts !== null) {
        yield Promise.all(posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            if (post.image) {
                post.imageUrl = yield cloudService.getFile(post.image.key);
            }
        })));
    }
    return posts;
});
exports.getPostByUserUseCase = getPostByUserUseCase;
const getPostsByFollowersUseCase = (userId, cloudService, postDbRepository, connectionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new appError_1.default('Please provide a valid id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const connectionData = yield connectionDbRepository.getFullUserList(userId);
    const followerIds = connectionData.flatMap((follower) => follower.followers.map((f) => f._id));
    const postsByFollowers = yield Promise.all(followerIds.map((followerId) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield postDbRepository.getPostByUser(followerId.toString());
        return posts;
    })));
    const currentUserPosts = yield postDbRepository.getPostByUser(userId);
    const allPosts = postsByFollowers.flat().concat(currentUserPosts);
    const unblockedPosts = allPosts.filter((post) => !(post === null || post === void 0 ? void 0 : post.blocked));
    yield Promise.all(unblockedPosts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        if (post && post.image) {
            post.imageUrl = yield cloudService.getFile(post.image.key);
        }
    })));
    return unblockedPosts;
});
exports.getPostsByFollowersUseCase = getPostsByFollowersUseCase;
//# sourceMappingURL=listPost.js.map