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
exports.likePostUseCase = exports.editPostUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const editPostUseCase = (userId, postId, files, postInfo, cloudService, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    let isImageUpdated = false;
    if (!postId) {
        throw new appError_1.default('Please provide a post id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!userId) {
        throw new appError_1.default('unable to get userId', HttpStatusCodes_1.default.FORBIDDEN);
    }
    if (!postInfo) {
        throw new appError_1.default('Please provide post details', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const oldPost = yield postDbRepository.getPostById(postId);
    // if (oldPost?.authorId.toString() !== userId) {
    //     throw new AppError('You have no permission to edit this post', HttpStatusCodes.FORBIDDEN);
    // }
    if (files && files.length > 0) {
        const uploadPromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const image = yield cloudService.upload(file, 'Posts/photo');
            postInfo.image = image;
            isImageUpdated = true;
        }));
        yield Promise.all(uploadPromises);
    }
    if ((oldPost === null || oldPost === void 0 ? void 0 : oldPost.authorId.toString()) === userId) {
        postInfo.authorId = userId;
    }
    const response = yield postDbRepository.editPost(postId, postInfo);
    if (response) {
        if (isImageUpdated && (oldPost === null || oldPost === void 0 ? void 0 : oldPost.image)) {
            yield cloudService.removeFile(oldPost.image.key);
        }
    }
});
exports.editPostUseCase = editPostUseCase;
const likePostUseCase = (userId, postId, reactionType, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    if (!postId) {
        throw new appError_1.default('Please provide a post id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!userId) {
        throw new appError_1.default('unable to get userId', HttpStatusCodes_1.default.FORBIDDEN);
    }
    if (!reactionType) {
        throw new appError_1.default('Please provide a reaction type', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const oldPost = yield postDbRepository.getPostById(postId);
    if (!oldPost) {
        throw new appError_1.default('Unable to get post details', HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR);
    }
    let postInfo = {
        likedBy: [{ userId: '', reactionType: '' }],
        likes: { like: (_a = oldPost.likes) === null || _a === void 0 ? void 0 : _a.like, thumbsUp: (_b = oldPost.likes) === null || _b === void 0 ? void 0 : _b.thumbsUp, heart: (_c = oldPost.likes) === null || _c === void 0 ? void 0 : _c.heart },
    };
    if (oldPost.likedBy) {
        postInfo.likedBy = [...oldPost.likedBy];
    }
    if (userId && reactionType) {
        const existingReactionIndex = postInfo.likedBy.findIndex((item) => item.userId.toString() == userId);
        const existingReaction = postInfo.likedBy.find((item) => item.userId.toString() == userId);
        if (existingReactionIndex == -1) {
            (_d = postInfo.likedBy) === null || _d === void 0 ? void 0 : _d.push({ userId, reactionType });
            if (reactionType == 'like') {
                postInfo.likes.like = (((_e = oldPost.likes) === null || _e === void 0 ? void 0 : _e.like) || 0) + 1;
            }
        }
        else {
            postInfo.likedBy.splice(existingReactionIndex, 1);
            if ((existingReaction === null || existingReaction === void 0 ? void 0 : existingReaction.reactionType) == 'like') {
                postInfo.likes.like = (((_f = oldPost.likes) === null || _f === void 0 ? void 0 : _f.like) || 0) - 1;
            }
        }
    }
    const response = yield postDbRepository.editPost(postId, postInfo);
    return response;
});
exports.likePostUseCase = likePostUseCase;
//# sourceMappingURL=editPost.js.map