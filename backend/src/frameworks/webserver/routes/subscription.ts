import subscriptionController from '../../../adapters/controllers/subscriptionController';
import { subscriptionDbRepository } from '../../../application/repositories/subscriptionDBRepository';
import { subscriptionRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/subscriptionRepoMongDb';
import express from 'express';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
import jwtAuthMiddleware from '../middlewares/userAuthMiddleware';

const subscriptionRouter = () => {
    const router = express.Router();
    const controller = subscriptionController(subscriptionDbRepository, subscriptionRepositoryMongoDb);
    router
        .route('/')
        .post(roleCheckMiddleware('admin'), jwtAuthMiddleware, controller.createSubscription)
        .get(controller.SubscriptionList);
    router.route('/:id').get(controller.getSubscriptionById);
    return router;
};

export default subscriptionRouter;
