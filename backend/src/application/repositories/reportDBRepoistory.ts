import { ReportRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/reportRepoMongoDb';
import { IAddReport } from '@src/types/reportInterface';

export const reportDbRepository = (repository: ReturnType<ReportRepositoryMongoDbInterface>) => {
    const reportPost = async (reportData: IAddReport) => await repository.addReport(reportData);
    return {
        reportPost,
    };
};

export type ReportDbRepositoryInterface = typeof reportDbRepository;
