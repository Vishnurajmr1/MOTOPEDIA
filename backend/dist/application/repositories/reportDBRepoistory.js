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
exports.reportDbRepository = void 0;
const reportDbRepository = (repository) => {
    const reportPost = (reportData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addReport(reportData); });
    const getReportByPostId = (reportInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getReportByPostId(reportInfo); });
    const getReportByReporterId = (reportInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getReportByReporterId(reportInfo); });
    const getReportedPosts = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllReportedPosts(); });
    const getPostReportedCount = (postId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.PostReportedCount(postId); });
    return {
        reportPost,
        getReportByPostId,
        getReportByReporterId,
        getReportedPosts,
        getPostReportedCount
    };
};
exports.reportDbRepository = reportDbRepository;
//# sourceMappingURL=reportDBRepoistory.js.map