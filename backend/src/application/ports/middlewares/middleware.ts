import { middlewareRequestModel } from "../requests/middleware-request-model";

export interface Middleware{
    handleRequest(requestModel:middlewareRequestModel):Promise<void>| never;
}