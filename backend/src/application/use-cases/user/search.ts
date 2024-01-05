import AppError from "../../../utils/appError";
import { usersDbInterface } from "../../../application/repositories/userDBRepository";
import { CloudServiceInterface } from "../../../application/services/cloudServiceInterface";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";


export const searchCourseUseCase=async(
    searchQuery:string,
    filterQuery:string,
    cloudService:ReturnType<CloudServiceInterface>,
    userDbRepository:ReturnType<usersDbInterface>
)=>{
    if(!searchQuery && !filterQuery){
        throw new AppError('Please Provide a search or filter query',HttpStatusCodes.BAD_REQUEST)
    }
    let isFree=false;
    let searchParams:string;
    if(searchQuery){
        const freeRegex=/^free\s/i;
        const isFreeMatch=searchQuery.match(freeRegex)
        if(isFreeMatch){
            isFree=true;
            searchParams=searchQuery.replace(freeRegex,'').trim()
        }else{
            searchParams=searchQuery;
        }
    }else{
        searchParams=filterQuery;
    }

    const searchResult=await userDbRepository
}