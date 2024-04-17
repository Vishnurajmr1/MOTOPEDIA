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
exports.reportPostUseCase = exports.reportPost = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const reportPost = (reportData, reportDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reportData) {
        throw new appError_1.default('Invalid data', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const targetId = reportData.targetId;
    const reporterId = reportData.reporterId;
    const getReportByPostId = yield reportDbRepository.getReportByPostId({ targetId });
    const existedData = getReportByPostId.find((item) => item.reporterId.toString() === reporterId);
    if (existedData) {
        throw new appError_1.default('User already reported this post', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const postReport = yield reportDbRepository.reportPost(reportData);
    return postReport;
});
exports.reportPost = reportPost;
const reportPostUseCase = (reportDbRepository, postDbRepository, cloudService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reportedPosts = yield reportDbRepository.getReportedPosts();
    console.log(reportedPosts);
    for (const report of reportedPosts) {
        const postId = report.postId;
        const post = yield postDbRepository.getPostById(postId);
        console.log(post);
        if (post && post.image) {
            report.title = post.title;
            report.likes = (_a = post.likedBy) === null || _a === void 0 ? void 0 : _a.length;
            report.imageUrl = (yield cloudService.getFile(post.image.key)) || '';
            report.authorId = post.authorId;
            report.blocked = post.blocked;
        }
    }
    return reportedPosts;
});
exports.reportPostUseCase = reportPostUseCase;
//# sourceMappingURL=reportPost.js.map