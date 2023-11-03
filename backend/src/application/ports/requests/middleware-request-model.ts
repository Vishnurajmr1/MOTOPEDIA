import { RequestModel } from "./request-model";

export interface MiddlewareRequestModel extends RequestModel{
    method?:string
}