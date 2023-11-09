import { RefreshTokenRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';

export const refreshTokenDbRepository = (repository: ReturnType<RefreshTokenRepositoryMongoDB>) => {
    const saveRefreshToken = async (userId: string, token: string, expirestAt: number) =>
        await repository.saveRefreshToken(userId, token, expirestAt);
    const deleteRefreshToken = async (id: string) => await repository.deleteRefreshToken(id);
    const findRefreshToken = async (refreshToken: string) => await repository.findRefreshToken(refreshToken);

    return {
        saveRefreshToken,
        deleteRefreshToken,
        findRefreshToken,
    };
};

export type RefreshTokenDbInterface = typeof refreshTokenDbRepository;
