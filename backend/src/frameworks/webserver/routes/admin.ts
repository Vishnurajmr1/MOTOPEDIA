import subscriptionController from '@src/adapters/controllers/subscriptionController';
import { subscriptionDbRepository } from '@src/application/repositories/subscriptionDBRepository';
import { subscriptionRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/subscriptionRepoMongDb';
import express from 'express';

const adminRouter = () => {
    const router = express.Router();
    return router;
};

export default adminRouter;
