import { paymentServiceInterface } from '@src/application/services/paymentServiceInterface';
import paymentController from '../../../adapters/controllers/paymentController';
import express from 'express';
import { paymentService } from '@src/frameworks/services/paymentService';

const paymentRouter = () => {
    const router = express.Router();
    const controller = paymentController(paymentServiceInterface, paymentService);
    router.route('/stripe/get-config').get(controller.getConfig);
    router.route('/create-checkout-session').post(controller.createPaymentSession);
    return router;
};

export default paymentRouter;
