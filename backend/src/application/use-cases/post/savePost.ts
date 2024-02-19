import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { EditPostInterface } from '@src/types/postInterface';
import AppError from '@src/utils/appError';

export const savePostUseCase = async (
    userId: string | undefined,
    postId: string,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    console.log(userId, postId);
    if (!postId) {
        throw new AppError('Please provide a post id', HttpStatusCodes.BAD_REQUEST);
    }
    if (!userId) {
        throw new AppError('unable to get userId', HttpStatusCodes.FORBIDDEN);
    }
    const oldPost = await postDbRepository.getPostById(postId);

    console.log(oldPost);
    if(userId){
        const exisitingUser:number=oldPost?.savedPosts?.indexOf(userId) ?? -1;
        if(exisitingUser===-1){
            oldPost?.savedPosts?.push(userId);
        }else{
            oldPost?.savedPosts?.splice(exisitingUser,1);
        }
        console.log(exisitingUser);
        const response=await postDbRepository.editPost(postId,oldPost as EditPostInterface)
        console.log(response);
        return response;
    }
};
