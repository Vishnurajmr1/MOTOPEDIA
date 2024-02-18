import { IAddReport } from '@src/types/reportInterface';
import AppError from '../../../utils/appError';
import { ReportDbRepositoryInterface } from '@src/application/repositories/reportDBRepoistory';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const reportPost = async (
    reportData: IAddReport,
    reportDbRepository: ReturnType<ReportDbRepositoryInterface>,
) => {
    if (!reportData) {
        throw new AppError('Invalid data', HttpStatusCodes.BAD_REQUEST);
    }
    const targetId = reportData.targetId;
    const reporterId = reportData.reporterId;
    const getReportByPostId = await reportDbRepository.getReportByPostId({targetId});
    console.log(getReportByPostId);
    const existedData = getReportByPostId.find((item) => item.reporterId.toString() === reporterId);
    console.log(existedData);
    if (existedData) {
        throw new AppError('User already reported this post', HttpStatusCodes.BAD_REQUEST);
    }
    const postReport = await reportDbRepository.reportPost(reportData);
    return postReport;
};
