export interface IAddReport{
    reporterId:string|undefined;
    targetType:string;
    targetId:string;
    reason?:string;
}

export interface IgetReportByPost{
    targetId?:string;
    reporterId?:string;
}