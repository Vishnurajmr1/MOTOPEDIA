import { RequestValidationError } from "application/errors/request-validation-error";
import { Controller } from "application/ports/controllers/controller";
import { RequestModel } from "application/ports/requests/request-model";
import { ResponseHandler } from "application/ports/responses/response-handler";
import { ResponseModel } from "application/ports/responses/response-model";
import { genericStringSanitizerSingleton } from "common/adapters/generic/generic_string_adapter";
import { isString } from "common/helpers/strings/is_string";
import { SignInResponseModel } from "domain/models/sign-in/sign-in-response-model";
import { refreshTokenUseCase } from "domain/use-cases/token/refresh-token-use-case";

type ControllerType=Controller<SignInResponseModel|never>;
type ResponseType=Promise<ResponseModel<SignInResponseModel>>|never;
type RequestType=RequestModel<{token:string}>;

export class RefreshTokenController implements ControllerType{
    constructor(
        private readonly refreshTokenUseCase:refreshTokenUseCase,
        private readonly presenter:ResponseHandler<SignInResponseModel>
    ){}

    async handleRequest(requestModel:RequestType){
        if(!requestModel||!requestModel.body||!requestModel.body.token){
            throw new RequestValidationError('Invalid Request');
        }
        
        const {token}=requestModel.body;

        if(!isString(token)){
            throw new RequestValidationError('Invalid token');
        }

        const saniitzedToken=genericStringSanitizerSingleton.sanitize(token);
        const response=await this.refreshTokenUseCase.refresh(saniitzedToken);

        return await this.presenter.response(response);
    }
}