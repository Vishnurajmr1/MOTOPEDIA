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
    console.log(reportedPosts);
    for (const report of reportedPosts) {
        const postId = report.postId;
        const post = await postDbRepository.getPostById(postId);
        console.log(post);
        if (post && post.image) {
            report.title = post.title;
            report.likes = post.likedBy?.length;
            report.imageUrl = (await cloudService.getFile(post.image.key)) || '';
            report.authorId = post.authorId;
            report.blocked = post.blocked;
        }
    }
    return reportedPosts;
};
