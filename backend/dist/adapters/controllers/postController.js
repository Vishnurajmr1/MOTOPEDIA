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
const addComment_1 = require("../../application/use-cases/comment/addComment");
const getAllComments_1 = require("../../application/use-cases/comment/getAllComments");
const addPost_1 = require("../../application/use-cases/post/addPost");
const deletePost_1 = require("../../application/use-cases/post/deletePost");
const editPost_1 = require("../../application/use-cases/post/editPost");
const listPost_1 = require("../../application/use-cases/post/listPost");
const reportPost_1 = require("../../application/use-cases/post/reportPost");
const savePost_1 = require("../../application/use-cases/post/savePost");
const HttResponseStatus_1 = __importDefault(require("../../constants/HttResponseStatus"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const postController = (cloudServiceInterface, cloudServiceImpl, postDbRepository, postDbRepositoryImpl, commentDbRepository, commentDbRepositoryImpl, reportDbRepository, reportDbRepositoryImpl, connectionDbRepository, connectionDbRepositoryImpl) => {
    const dbRepositoryPost = postDbRepository(postDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const dbRepositoryComment = commentDbRepository(commentDbRepositoryImpl());
    const dbRepositoryReport = reportDbRepository(reportDbRepositoryImpl());
    const dbRepositoryConnection = connectionDbRepository(connectionDbRepositoryImpl());
    const addPost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const post = req.body;
        const files = req.files;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        const response = yield (0, addPost_1.addPosts)(userId, post, files, cloudService, dbRepositoryPost);
        res.status(201).json({
            status: 'success',
            message: 'Post added Successfully',
            data: response,
        });
    }));
    const editPost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const post = req.body;
        const files = req.files;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        const postId = req.params.postId;
        console.log(post, postId);
        const response = yield (0, editPost_1.editPostUseCase)(userId, postId, files, post, cloudService, dbRepositoryPost);
        res.status(200).json({
            status: 'success',
            message: 'Successfully modified the post',
            data: response,
        });
    }));
    const deletePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.Id;
        const postId = req.params.postId;
        console.log(postId, userId);
        yield (0, deletePost_1.deletePostById)(userId, postId, cloudService, dbRepositoryPost);
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted the post',
            data: null
        });
    }));
    const getAllPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield (0, listPost_1.getAllPostsUseCase)(cloudService, dbRepositoryPost);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully retrieved all posts',
            data: posts,
        });
    }));
    const getPostByUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d, _e;
        const userId = ((_d = req.query) === null || _d === void 0 ? void 0 : _d.Id) || ((_e = req.user) === null || _e === void 0 ? void 0 : _e.Id);
        const posts = yield (0, listPost_1.getPostByUserUseCase)(userId, cloudService, dbRepositoryPost);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully get post by current user',
            data: posts,
        });
    }));
    const likePostById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.Id;
        const { postId, reactionType } = req.body;
        const post = yield (0, editPost_1.likePostUseCase)(userId, postId, reactionType, dbRepositoryPost);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully modified  the post',
            data: { post, userId },
        });
    }));
    const addCommentByPostId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        const userId = (_g = req.user) === null || _g === void 0 ? void 0 : _g.Id;
        const { postId, content, parentId } = req.body;
        const commentInfo = { postId, userId, content, parentId };
        const comments = yield (0, addComment_1.addComment)(userId, postId, commentInfo, dbRepositoryComment);
        res.status(201).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'comment added successfully',
            data: comments,
        });
    }));
    const fetchCommentByPostId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = req.params.postId;
        const comments = yield (0, getAllComments_1.getAllComments)(postId, dbRepositoryComment);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Fetched all comments by postId',
            data: comments,
        });
    }));
    const reportPostById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _h;
        const targetId = req.params.postId;
        const reporterId = (_h = req.user) === null || _h === void 0 ? void 0 : _h.Id;
        const { reason, targetType } = req.body;
        const data = yield (0, reportPost_1.reportPost)({ reporterId, targetType, targetId, reason }, dbRepositoryReport);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Post reported successfully',
            data,
        });
    }));
    const getReportedPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, reportPost_1.reportPostUseCase)(dbRepositoryReport, dbRepositoryPost, cloudService);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Fetched reported posts successfully',
            data: data || [],
        });
    }));
    const savePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _j;
        const postId = req.params.postId;
        const saveUserId = (_j = req.user) === null || _j === void 0 ? void 0 : _j.Id;
        const data = yield (0, savePost_1.savePostUseCase)(saveUserId, postId, dbRepositoryPost);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Post saved successfully',
            data,
        });
    }));
    const getSavedPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _k;
        const userId = (_k = req.user) === null || _k === void 0 ? void 0 : _k.Id;
        const posts = yield (0, savePost_1.getSavedPostsUseCase)(userId, dbRepositoryPost, cloudService);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully get all saved posts of current user',
            data: posts,
        });
    }));
    const getPostsByFollowers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _l;
        const userId = (_l = req.user) === null || _l === void 0 ? void 0 : _l.Id;
        const posts = yield (0, listPost_1.getPostsByFollowersUseCase)(userId, cloudService, dbRepositoryPost, dbRepositoryConnection);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully fetched the posts of followers',
            data: posts,
        });
    }));
    return {
        addPost,
        editPost,
        deletePost,
        getAllPosts,
        getPostByUser,
        likePostById,
        addCommentByPostId,
        fetchCommentByPostId,
        reportPostById,
        savePost,
        getSavedPosts,
        getPostsByFollowers,
        getReportedPosts,
    };
};
exports.default = postController;
//# sourceMappingURL=postController.js.map