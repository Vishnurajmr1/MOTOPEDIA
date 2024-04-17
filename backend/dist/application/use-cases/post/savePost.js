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
exports.getSavedPostsUseCase = exports.savePostUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const savePostUseCase = (userId, postId, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (!postId) {
        throw new appError_1.default('Please provide a post id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!userId) {
        throw new appError_1.default('unable to get userId', HttpStatusCodes_1.default.FORBIDDEN);
    }
    const oldPost = yield postDbRepository.getPostById(postId);
    if (userId) {
        const exisitingUser = (_b = (_a = oldPost === null || oldPost === void 0 ? void 0 : oldPost.savedPosts) === null || _a === void 0 ? void 0 : _a.indexOf(userId)) !== null && _b !== void 0 ? _b : -1;
        if (exisitingUser === -1) {
            (_c = oldPost === null || oldPost === void 0 ? void 0 : oldPost.savedPosts) === null || _c === void 0 ? void 0 : _c.push(userId);
        }
        else {
            (_d = oldPost === null || oldPost === void 0 ? void 0 : oldPost.savedPosts) === null || _d === void 0 ? void 0 : _d.splice(exisitingUser, 1);
        }
        const response = yield postDbRepository.editPost(postId, oldPost);
        return response;
    }
});
exports.savePostUseCase = savePostUseCase;
const getSavedPostsUseCase = (userId, postDbRepository, cloudService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new appError_1.default('unable to get userId', HttpStatusCodes_1.default.FORBIDDEN);
    }
    const posts = yield postDbRepository.getSavedPosts(userId);
    if (posts !== null) {
        yield Promise.all(posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            if (post.image) {
                post.imageUrl = yield cloudService.getFile(post.image.key);
            }
        })));
    }
    return posts;
});
exports.getSavedPostsUseCase = getSavedPostsUseCase;
//# sourceMappingURL=savePost.js.map