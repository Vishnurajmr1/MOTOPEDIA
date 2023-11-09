import { AdminRepoMongodb } from '@src/frameworks/database/mongodb/repositories/adminRepoMongoDb';

export const adminDbRepostiory = (repository: ReturnType<AdminRepoMongodb>) => {
    const getAdminByEmail = async (email: string) => await repository.getAdminByEmail(email);

    return { getAdminByEmail };
};

export type AdminDbInterface = typeof adminDbRepostiory;
