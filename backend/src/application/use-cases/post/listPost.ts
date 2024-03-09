import { ConnectionDbRepositoryInterface } from '../../repositories/connectionDBRepository';
import { PostDbRepositoryInterface } from '../../repositories/postDBRepository';
import { CloudServiceInterface } from '../../services/cloudServiceInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { postInterface } from '../../../types/postInterface';
import AppError from '../../../utils/appError';

export const getAllPostsUseCase = async (
    cloudService: ReturnType<CloudServiceInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    const posts: postInterface[] | null = await postDbRepository.getAllPosts();
    await Promise.all(
        posts.map(async (post) => {
            if (post.image) {
                post.imageUrl = await cloudService.getFile(post.image.key);
            }
        }),
    );
    return posts;
};

export const getPostByUserUseCase = async (
    userId: string | undefined,
    cloudService: ReturnType<CloudServiceInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
) => {
    if (!userId) {
        throw new AppError('Invalid user Id', HttpStatusCodes.BAD_REQUEST);
    }
    const posts = await postDbRepository.getPostByUser(userId);

    await Promise.all(
        posts.map(async (post) => {
            if (post.image) {
                post.imageUrl = await cloudService.getFile(post.image.key);
            }
        }),
    );
    return posts;
};

export const getPostsByFollowersUseCase= async (
    userId:string|undefined,
    cloudService: ReturnType<CloudServiceInterface>,
    postDbRepository: ReturnType<PostDbRepositoryInterface>,
    connectionDbRepository: ReturnType<ConnectionDbRepositoryInterface>,
)=>{
if(!userId){
    throw new AppError('Please provide a valid id',HttpStatusCodes.BAD_REQUEST);
}
const connectionData=await connectionDbRepository.getFullUserList(userId);
const followerIds=connectionData.flatMap(follower=>follower.followers.map(f=>f._id));
const postsByFollowers=await Promise.all(followerIds.map(async(followerId)=>{
    const posts=await postDbRepository.getPostByUser(followerId.toString())
    return posts
}))
return postsByFollowers;
}

// const followers=connectionData.map((user)=>{
//     user.followers
// })