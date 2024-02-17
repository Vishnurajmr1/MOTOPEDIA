import { IAddReport } from '@src/types/reportInterface';
import Report from '../models/report.Model';
import mongoose from 'mongoose';

export const reportRepositoryMongoDb = () => {
    const addReport = async (reportInfo: IAddReport) => {
        const saveReport = new Report(reportInfo);
        const { _id: reportId } = await saveReport.save();
        return reportId;
    };
    return {
        addReport,
    };
};

export type ReportRepositoryMongoDbInterface = typeof reportRepositoryMongoDb;
