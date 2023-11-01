import { RequestModel } from "./request-model";

export interface middlewareRequestModel extends RequestModel{
    method?:string
}