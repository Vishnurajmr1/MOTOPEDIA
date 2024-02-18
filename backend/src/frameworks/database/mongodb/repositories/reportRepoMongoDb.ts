import { IAddReport, IgetReportByPost } from '../../../../types/reportInterface';
import Report from '../models/report.Model';
import mongoose from 'mongoose';

export const reportRepositoryMongoDb = () => {
    const addReport = async (reportInfo: IAddReport) => {
        const saveReport = new Report(reportInfo);
        const { _id: reportId } = await saveReport.save();
        return reportId;
    };

    const getReportByPostId=async(reportInfo:IgetReportByPost)=>{
        const {reporterId,targetId}=reportInfo;
        const getDataByPost= await Report.find({targetId:targetId});
        return getDataByPost;
    }
    const getReportByReporterId=async(reportInfo:IgetReportByPost)=>{
        const {reporterId}=reportInfo;
        const getDataByUser=await Report.find({reporterId});
        return getDataByUser;
    }
    return {
        addReport,
        getReportByPostId,
        getReportByReporterId
    };
};

export type ReportRepositoryMongoDbInterface = typeof reportRepositoryMongoDb;
