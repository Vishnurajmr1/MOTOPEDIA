import { ResponseModel } from "./response-model";

export interface ResponseHandler<T=any>{
    response(body:T):Promise<ResponseModel<T>>;
}