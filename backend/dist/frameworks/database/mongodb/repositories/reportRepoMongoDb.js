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
exports.reportRepositoryMongoDb = void 0;
const report_Model_1 = __importDefault(require("../models/report.Model"));
const mongoose_1 = __importDefault(require("mongoose"));
const reportRepositoryMongoDb = () => {
    const addReport = (reportInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const saveReport = new report_Model_1.default(reportInfo);
        const { _id: reportId } = yield saveReport.save();
        return reportId;
    });
    const getReportByPostId = (reportInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const { reporterId, targetId } = reportInfo;
        const getDataByPost = yield report_Model_1.default.find({ targetId: targetId });
        return getDataByPost;
    });
    const getReportByReporterId = (reportInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const { reporterId } = reportInfo;
        const getDataByUser = yield report_Model_1.default.find({ reporterId });
        return getDataByUser;
    });
    const getAllReportedPosts = () => __awaiter(void 0, void 0, void 0, function* () {
        const reportedPosts = yield report_Model_1.default.aggregate([
            {
                $match: { targetType: 'post' },
            },
            {
                $group: {
                    _id: '$targetId',
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'targetId',
                    foreignField: '_id',
                    as: 'posts',
                },
            },
            {
                $project: {
                    _id: 0,
                    postId: '$_id',
                    post: { $arrayElemAt: ['$posts', 0] },
                    reportCount: '$count',
                },
            },
        ]);
        return reportedPosts;
    });
    const PostReportedCount = (postId) => __awaiter(void 0, void 0, void 0, function* () {
        const reportCount = yield report_Model_1.default.aggregate([
            {
                $match: {
                    targetId: new mongoose_1.default.Types.ObjectId(postId),
                    targetType: 'post',
                },
            },
            {
                $count: 'totalReport',
            },
        ]);
        const totalReports = reportCount.length > 0 ? reportCount[0].totalReport : 0;
        return totalReports;
    });
    return {
        addReport,
        getReportByPostId,
        getReportByReporterId,
        getAllReportedPosts,
        PostReportedCount,
    };
};
exports.reportRepositoryMongoDb = reportRepositoryMongoDb;
//# sourceMappingURL=reportRepoMongoDb.js.map