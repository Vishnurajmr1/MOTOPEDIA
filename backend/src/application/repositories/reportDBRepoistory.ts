import { ReportRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/reportRepoMongoDb';
import { IAddReport, IgetReportByPost } from '../../types/reportInterface';

export const reportDbRepository = (repository: ReturnType<ReportRepositoryMongoDbInterface>) => {
    const reportPost = async (reportData: IAddReport) => await repository.addReport(reportData);
    const getReportByPostId = async (reportInfo: IgetReportByPost) => await repository.getReportByPostId(reportInfo);
    const getReportByReporterId = async (reportInfo: IgetReportByPost) =>
        await repository.getReportByReporterId(reportInfo);
    const getReportedPosts=async()=>await repository.getAllReportedPosts();
    const getPostReportedCount=async(postId:string)=>await repository.PostReportedCount(postId)
    return {
        reportPost,
        getReportByPostId,
        getReportByReporterId,
        getReportedPosts,
        getPostReportedCount
    };
};

export type ReportDbRepositoryInterface = typeof reportDbRepository;
