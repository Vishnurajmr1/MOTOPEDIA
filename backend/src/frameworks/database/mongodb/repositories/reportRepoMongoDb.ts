import { IAddReport, IgetReportByPost } from '../../../../types/reportInterface';
import Report from '../models/report.Model';
import mongoose from 'mongoose';

export const reportRepositoryMongoDb = () => {
    const addReport = async (reportInfo: IAddReport) => {
        const saveReport = new Report(reportInfo);
        const { _id: reportId } = await saveReport.save();
        return reportId;
    };

    const getReportByPostId = async (reportInfo: IgetReportByPost) => {
        const { reporterId, targetId } = reportInfo;
        const getDataByPost = await Report.find({ targetId: targetId });
        return getDataByPost;
    };
    const getReportByReporterId = async (reportInfo: IgetReportByPost) => {
        const { reporterId } = reportInfo;
        const getDataByUser = await Report.find({ reporterId });
        return getDataByUser;
    };
    const getAllReportedPosts = async () => {
        const reportedPosts = await Report.aggregate([
            {
                $match: { targetType: 'post' },
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'targetId',
                    foreignField: '_id',
                    as: 'posts',
                },
            },
        ]);
        return reportedPosts;
    };
    const PostReportedCount = async (postId: string) => {
        const reportCount = await Report.aggregate([
            {
                $match: {
                    targetId: new mongoose.Types.ObjectId(postId),
                    targetType: 'post',
                },
            },
            {
                $count: 'totalReport',
            },
        ]);
        const totalReports = reportCount.length > 0 ? reportCount[0].totalReport : 0;
        return totalReports;
    };
    return {
        addReport,
        getReportByPostId,
        getReportByReporterId,
        getAllReportedPosts,
        PostReportedCount,
    };
};

export type ReportRepositoryMongoDbInterface = typeof reportRepositoryMongoDb;
