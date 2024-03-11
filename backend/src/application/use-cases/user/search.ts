import AppError from '../../../utils/appError';
import { usersDbInterface } from '../../../application/repositories/userDBRepository';
import { CloudServiceInterface } from '../../../application/services/cloudServiceInterface';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const searchUserUseCase = async (searchQuery: string, userDbRepository: ReturnType<usersDbInterface>) => {
    if (!searchQuery) {
        throw new AppError('Please Provide a search query', HttpStatusCodes.BAD_REQUEST);
    }
    const searchResult = await userDbRepository.searchUser(searchQuery);
    console.log(searchResult);
    return searchResult;
};


export const getAvailableUsersUsingSearch=async(userid:string|undefined,userDbRepository:ReturnType<usersDbInterface>)=>{

    if(!userid){
        throw new AppError('Please provide a valid userId',HttpStatusCodes.BAD_REQUEST);
    }
    const searchResult=await userDbRepository.searchAvailableUsers(userid);
    return searchResult;
}