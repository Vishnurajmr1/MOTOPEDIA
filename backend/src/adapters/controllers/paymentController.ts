import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { PaymentServiceInterface } from '@src/application/services/paymentServiceInterface';
import { PaymentServiceImpl } from '@src/frameworks/services/paymentService';
import asyncHandler from 'express-async-handler';
import { createSessionsUseCase, getConfigUseCase } from '@src/application/use-cases/payment/createPayment';
import Status from '@src/constants/HttResponseStatus';

const paymentController = (
    paymentServiceInterface: PaymentServiceInterface,
    paymentServiceImpl: PaymentServiceImpl,
) => {
    const paymentService = paymentServiceInterface(paymentServiceImpl());
    const getConfig = asyncHandler(async (req: Request, res: Response) => {
        const config = getConfigUseCase(paymentService);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'successfully completed payment',
            data: config,
        });
    });
    const createPaymentSession = asyncHandler(async (req: Request, res: Response) => {
        const priceId = req.body.priceId;
        const paymentSessionId = await createSessionsUseCase(priceId, paymentService);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'successfully created session',
            data: paymentSessionId,
        });
    });
    return {
        getConfig,
        createPaymentSession,
    };
};

export default paymentController;
