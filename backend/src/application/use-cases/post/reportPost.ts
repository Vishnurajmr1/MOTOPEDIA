import { IAddReport } from '@src/types/reportInterface';
import AppError from '../../../utils/appError';
import { ReportDbRepositoryInterface } from '@src/application/repositories/reportDBRepoistory';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const reportPost = async (
    reportData: IAddReport,
    reportDbRepository: ReturnType<ReportDbRepositoryInterface>,
) => {
    if (!reportData) {
        throw new AppError('Invalid input data', HttpStatusCodes.BAD_REQUEST);
    }
    const postReport = await reportDbRepository.reportPost(reportData);
    return postReport;
};
