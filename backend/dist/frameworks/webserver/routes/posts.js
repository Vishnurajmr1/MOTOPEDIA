"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthMiddleware_1 = __importDefault(require("../middlewares/userAuthMiddleware"));
const cloudServiceInterface_1 = require("../../../application/services/cloudServiceInterface");
const postController_1 = __importDefault(require("../../../adapters/controllers/postController"));
const s3Service_1 = require("../../../frameworks/services/s3Service");
const postDBRepository_1 = require("../../../application/repositories/postDBRepository");
const postRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/postRepoMongoDb");
const multer_1 = __importDefault(require("../middlewares/multer"));
const commentDBRepository_1 = require("../../../application/repositories/commentDBRepository");
const commentRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/commentRepoMongoDb");
const reportDBRepoistory_1 = require("../../../application/repositories/reportDBRepoistory");
const reportRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/reportRepoMongoDb");
const connectionDBRepository_1 = require("../../../application/repositories/connectionDBRepository");
const connectionRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/connectionRepoMongoDb");
const roleCheckMiddleware_1 = __importDefault(require("../middlewares/roleCheckMiddleware"));
const postRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, postController_1.default)(cloudServiceInterface_1.cloudServiceInterface, s3Service_1.s3Service, postDBRepository_1.postDbRepository, postRepoMongoDb_1.postRepositoryMongoDb, commentDBRepository_1.commentDbRepository, commentRepoMongoDb_1.commentRepositoryMongoDb, reportDBRepoistory_1.reportDbRepository, reportRepoMongoDb_1.reportRepositoryMongoDb, connectionDBRepository_1.connectionDbRepository, connectionRepoMongoDb_1.connectionRepositoryMongoDB);
    router.route('/get-all-posts').get(userAuthMiddleware_1.default, controller.getAllPosts);
    router.route('/').post(userAuthMiddleware_1.default, multer_1.default.array('files'), controller.addPost);
    router.route('/edit-post/:postId').put(userAuthMiddleware_1.default, multer_1.default.array('files'), controller.editPost);
    router.route('/delete-post/:postId').delete(userAuthMiddleware_1.default, controller.deletePost);
    router.route('/get-post-by-user').get(userAuthMiddleware_1.default, controller.getPostByUser);
    router.route('/like-post').put(userAuthMiddleware_1.default, controller.likePostById);
    router.route('/add-comment').post(userAuthMiddleware_1.default, controller.addCommentByPostId);
    router.route('/get-all-comments/:postId').get(userAuthMiddleware_1.default, controller.fetchCommentByPostId);
    router.route('/report/:postId').post(userAuthMiddleware_1.default, controller.reportPostById);
    router.route('/save-post/:postId').patch(userAuthMiddleware_1.default, controller.savePost);
    router.route('/saved-post').get(userAuthMiddleware_1.default, controller.getSavedPosts);
    router.route('/get-followers-post').get(userAuthMiddleware_1.default, controller.getPostsByFollowers);
    router.route('/get-reported-posts').get(userAuthMiddleware_1.default, (0, roleCheckMiddleware_1.default)('admin'), controller.getReportedPosts);
    // router.route('/unlike-post').patch(jwtAuthMiddleware);
    return router;
};
exports.default = postRouter;
//# sourceMappingURL=posts.js.map