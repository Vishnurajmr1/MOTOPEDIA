import {
    AdminRepositoryMongoDb,
    adminRepoMongodb,
} from '../../frameworks/database/mongodb/repositories/adminRepoMongoDb';

export const adminDbRepostiory = (repository: ReturnType<AdminRepositoryMongoDb>) => {
    const getAdminByEmail = async (email: string) => await repository.getAdminByEmail(email);
    return { getAdminByEmail };
};

export type AdminDbInterface = typeof adminDbRepostiory;
