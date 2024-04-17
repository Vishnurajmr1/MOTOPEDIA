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
exports.postRepositoryMongoDb = void 0;
const post_1 = __importDefault(require("../models/post"));
const mongoose_1 = __importDefault(require("mongoose"));
const postRepositoryMongoDb = () => {
    const addPost = (postInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = new post_1.default(postInfo);
        const { _id: postId } = yield newPost.save();
        return postId;
    });
    const editPost = (postId, editInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield post_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(postId) }, Object.assign({}, editInfo), { new: true });
        return response;
    });
    const getPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield post_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(postId) }).populate({
            path: 'authorId',
            select: 'firstName lastName ',
        });
        return post;
    });
    const getAllPost = () => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield post_1.default.find({}).sort({ createdAt: -1 }).populate({
            path: 'authorId',
            select: 'firstName lastName ',
        });
        return posts;
    });
    const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
        yield post_1.default.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(postId) });
    });
    const getPostByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield post_1.default.find({
            authorId: { $in: [new mongoose_1.default.Types.ObjectId(userId)] },
        }).populate({ path: 'authorId', select: 'firstName lastName' });
        return posts;
    });
    const getSavedPostsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield post_1.default.find({
            savedPosts: { $in: [new mongoose_1.default.Types.ObjectId(userId)] },
        });
        return posts;
    });
    return {
        addPost,
        editPost,
        getPostById,
        getAllPost,
        deletePost,
        getPostByUser,
        getSavedPostsByUser
    };
};
exports.postRepositoryMongoDb = postRepositoryMongoDb;
//# sourceMappingURL=postRepoMongoDb.js.map