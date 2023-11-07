import { RepositoryError } from '~/application/errors/repository-error';
import { CreateTokenRepository } from '~/application/ports/repositories/token/create-token-repository';
import { DeleteTokenByUserIdRepository } from '~/application/ports/repositories/token/delete-token-by-user-id-repository';
import { FindTokenByIdRepository } from '~/application/ports/repositories/token/find-token-by-id-repository';
import { FindTokenByTokenRepository } from '~/application/ports/repositories/token/find-token-by-token-repository';
import { FindTokenByUserIdRepository } from '~/application/ports/repositories/token/find-token-by-user-id-repository';
import { Token } from '~/domain/models/token/token';
import { TokenRequestModel } from '~/domain/models/token/token-request-model';
import TokenModel from '~/infrastructure/mongodb/schemas/token';
import { Model, Document } from 'mongoose';

export class TokenNoSqlRepository
    implements
        FindTokenByTokenRepository,
        FindTokenByIdRepository,
        FindTokenByUserIdRepository,
        CreateTokenRepository,
        DeleteTokenByUserIdRepository
{
    async findByToken(token: string): Promise<Token | null> {
        return TokenModel.findOne({ token, expires_in: { $gt: new Date() } });
    }
    async findById(id: string): Promise<Token | null> {
        return TokenModel.findOne({ _id: id, expires_in: { $gt: new Date() } });
    }
    async findByUserId(userId: string): Promise<Token | null> {
        return TokenModel.findOne({ user_id: userId, expires_in: { $gt: new Date() } });
    }
    async create(tokenModel: TokenRequestModel): Promise<Token> {
        if (!tokenModel || !tokenModel.user_id || !tokenModel.token) {
            throw new RepositoryError('Cannot create token without the values');
        }
        try {
            const token = await TokenModel.create(tokenModel);//TODO Check for the issue in this code
            return {
                ...tokenModel,
                id: token[0].toString(),
            };
        } catch (error: any) {
            const repositoryError = new RepositoryError('Could not create token');
            repositoryError.stack = error.stack;
            throw repositoryError;
        }
    }
    async deleteByUserId(userId: string): Promise<number> {
        const { deletedCount } = await TokenModel.deleteMany({ user_id: userId });
        return deletedCount;
    }
}
