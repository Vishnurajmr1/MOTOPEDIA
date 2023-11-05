import { SignInResponseModel } from "~/domain/models/sign-in/sign-in-response-model";

export interface refreshTokenUseCase{
    refresh(refreshToken:string):Promise<SignInResponseModel>|never;
}