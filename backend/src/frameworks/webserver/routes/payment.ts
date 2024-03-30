import { paymentServiceInterface } from '@src/application/services/paymentServiceInterface';
import paymentController from '../../../adapters/controllers/paymentController';
import express from 'express';
import { paymentService } from '@src/frameworks/services/paymentService';
import { userDbRepository } from '@src/application/repositories/userDBRepository';
import { subscriptionDbRepository } from '@src/application/repositories/subscriptionDBRepository';
import { userRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { subscriptionRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/subscriptionRepoMongDb';
import { paymentRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/paymentRepoMongoDb';
import { paymentInterface } from '@src/application/repositories/paymentDBRepository';
const paymentRouter = () => {
    const router = express.Router();
    const controller = paymentController(paymentServiceInterface,paymentService,subscriptionDbRepository,
        subscriptionRepositoryMongoDb,paymentInterface,paymentRepositoryMongoDb,userDbRepository,userRepositoryMongoDB,);
    router.route('/stripe/get-config').get(controller.getConfig);
    router.route('/create-checkout-session').post(controller.createPaymentSession);
    return router;
};

export default paymentRouter;
