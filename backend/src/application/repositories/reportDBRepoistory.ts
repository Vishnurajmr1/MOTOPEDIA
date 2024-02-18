import { ReportRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/reportRepoMongoDb';
import { IAddReport, IgetReportByPost } from '@src/types/reportInterface';

export const reportDbRepository = (repository: ReturnType<ReportRepositoryMongoDbInterface>) => {
    const reportPost = async (reportData: IAddReport) => await repository.addReport(reportData);
    const getReportByPostId = async (reportInfo: IgetReportByPost) => await repository.getReportByPostId(reportInfo);
    const getReportByReporterId = async (reportInfo: IgetReportByPost) =>
        await repository.getReportByReporterId(reportInfo);
    return {
        reportPost,
        getReportByPostId,
        getReportByReporterId,
    };
};

export type ReportDbRepositoryInterface = typeof reportDbRepository;
