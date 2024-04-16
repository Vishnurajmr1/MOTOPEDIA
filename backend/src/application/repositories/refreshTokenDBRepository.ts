import { RefreshTokenRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';

export const refreshTokenDbRepository = (repository: ReturnType<RefreshTokenRepositoryMongoDB>) => {
    const saveRefreshToken = async (userId: string, token: string, expirestAt: number) =>
        await repository.saveRefreshToken(userId, token, expirestAt);
    const deleteRefreshToken = async (id: string) => await repository.deleteRefreshToken(id);
    const findRefreshToken = async (refreshToken: string) => await repository.findRefreshToken(refreshToken);
    const findRefreshTokenByUserId=async(id:string,refreshToken:string)=>await repository.findRefreshTokenByUserId(id,refreshToken);
    return {
        saveRefreshToken,
        deleteRefreshToken,
        findRefreshToken,
        findRefreshTokenByUserId
    };
};

export type RefreshTokenDbInterface = typeof refreshTokenDbRepository;
