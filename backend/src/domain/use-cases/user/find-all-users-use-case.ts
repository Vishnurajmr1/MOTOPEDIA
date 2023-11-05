import { User } from "~/domain/models/user/user";

export type FindAllUsersRequestModel={
    order?:'desc'|'asc';
    limit?:number;
    skip?:number;
}

export interface FindAllUsersUseCase{
    findAll(requestModel?:FindAllUsersRequestModel):Promise<User[]>;
}