import { PostDbRepositoryInterface } from '@src/application/repositories/postDBRepository';
import { CloudServiceInterface } from '@src/application/services/cloudServiceInterface';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AddPostInterface } from '@src/types/postInterface';
import AppError from '@src/utils/appError';

export const addPosts = async (
    userId: string | undefined,
    postInfo: AddPostInterface,
    files: Express.Multer.File[],
    cloudService: ReturnType<CloudServiceInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    if (!userId || !postInfo || !files || files.length === 0) {
        throw new AppError('Invalid input data', HttpStatusCodes.BAD_REQUEST);
    }
    console.log(files);
    const uploadPromises = files.map(async (file) => {
        let uploadedFile: any;
        if (file.mimetype.includes('image')) {
            uploadedFile = await cloudService.upload(file,'Posts/photo');
            postInfo.image = uploadedFile;
        }
        if(file.mimetype.includes('video')){
            uploadedFile=await cloudService.upload(file,'Posts/video')
        }
    });
    await Promise.all(uploadPromises);
    postInfo.authorId = userId;
    console.log(postInfo);
    console.log('postInfo')
    const postId = await postDbRepository.addPost(postInfo);

    if (!postId) {
        throw new AppError('Unable to add Post', HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return postId;
};
