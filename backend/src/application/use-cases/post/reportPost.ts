import { IAddReport } from '@src/types/reportInterface';
import AppError from '../../../utils/appError';
import { ReportDbRepositoryInterface } from '@src/application/repositories/reportDBRepoistory';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';

export const reportPost = async (
    reportData: IAddReport,
    reportDbRepository: ReturnType<ReportDbRepositoryInterface>,
) => {
    if (!reportData) {
        throw new AppError('Invalid data', HttpStatusCodes.BAD_REQUEST);
    }
    const targetId = reportData.targetId;
    const reporterId = reportData.reporterId;
    const getReportByPostId = await reportDbRepository.getReportByPostId({ targetId });
    const existedData = getReportByPostId.find((item) => item.reporterId.toString() === reporterId);
    if (existedData) {
        throw new AppError('User already reported this post', HttpStatusCodes.BAD_REQUEST);
    }
    const postReport = await reportDbRepository.reportPost(reportData);
    return postReport;
};

export const reportPostUseCase = async (
    reportDbRepository: ReturnType<ReportDbRepositoryInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
    cloudService: ReturnType<CloudServiceInterface>,
) => {
    const reportedPosts = await reportDbRepository.getReportedPosts();
    for (const report of reportedPosts) {
        const postId = report.posts[0]._id;
        const getPosts = await postDbRepository.getPostById(postId);
        if (getPosts && getPosts.image) {
            report.posts[0].imageUrl = (await cloudService.getFile(getPosts.image.key)) || '';
            const reportCount = await reportDbRepository.getPostReportedCount(postId);
            report.posts[0].reportCount = reportCount;
            report.posts[0].authorId = getPosts.authorId;
        }
    }
    return reportedPosts;
};
