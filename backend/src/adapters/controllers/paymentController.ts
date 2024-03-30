import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { PaymentServiceInterface } from '@src/application/services/paymentServiceInterface';
import { PaymentServiceImpl } from '@src/frameworks/services/paymentService';
import asyncHandler from 'express-async-handler';
import {
    createCustomerUseCase,
    createPaymentUseCase,
    createSessionsUseCase,
    getConfigUseCase,
} from '@src/application/use-cases/payment/createPayment';
import Status from '@src/constants/HttResponseStatus';
import { CustomRequest } from '@src/types/customRequest';
import { subscriptionDbInterface } from '@src/application/repositories/subscriptionDBRepository';
import { SubscriptionRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/subscriptionRepoMongDb';
import { usersDbInterface } from '@src/application/repositories/userDBRepository';
import { UserRepositoryMongoDB } from '@src/frameworks/database/mongodb/repositories/UserRepoMongoDb';
import { IPaymentInfo } from '@src/types/paymentInterface';
import { PaymentDbInterface } from '@src/application/repositories/paymentDBRepository';
import { PaymentImplInterface } from '@src/frameworks/database/mongodb/repositories/paymentRepoMongoDb';

const paymentController = (
    paymentServiceInterface: PaymentServiceInterface,
    paymentServiceImpl: PaymentServiceImpl,
    subscriptionDbRepository: subscriptionDbInterface,
    subscriptionDbRepositoryImplementation: SubscriptionRepositoryMongoDb,
    paymentDbRepository: PaymentDbInterface,
    paymentDbRepositoryImplementation: PaymentImplInterface,
    userDbRepository: usersDbInterface,
    userDbRepositoryImplementation: UserRepositoryMongoDB,
) => {
    const paymentService = paymentServiceInterface(paymentServiceImpl());
    const dbRepositorySubscription = subscriptionDbRepository(subscriptionDbRepositoryImplementation());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const dbRepositoryPayment = paymentDbRepository(paymentDbRepositoryImplementation());

    const getConfig = asyncHandler(async (req: Request, res: Response) => {
        const config = getConfigUseCase(paymentService);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'successfully completed payment',
            data: config,
        });
    });
    const createStripeCustomer = asyncHandler(async (req: CustomRequest, res: Response) => {
        const userEmail: string = req.user?.email || '';
        const stripeCustomer = await createCustomerUseCase(userEmail, paymentService);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Stripe customer creation Successfull',
            data: stripeCustomer,
        });
    });
    const createPaymentSession = asyncHandler(async (req: CustomRequest, res: Response) => {
        const priceId = req.body.priceId;
        const paymentSessionId = await createSessionsUseCase(priceId, paymentService);
        const userId: string = req.user?.Id || '';
        const sessionDetails = await retrievePaymentDetails(paymentSessionId);
        const paymentInfo = extractPaymentInfo(sessionDetails, userId);
        console.log('paymentInfo started');
        console.log(paymentInfo);
        console.log('paymentInfo Completed done');
        await createPayment(paymentInfo);
        const updatedDetails = await updateUserDetails(userId);
        console.log('Session Details fetched');
        console.log(sessionDetails);
        console.log('Session Details fetched Completed');
        console.log('updated Details fetched Started');
        console.log(updatedDetails);
        console.log('Updated Details done true');
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'successfully created session',
            data: paymentSessionId,
        });
    });

    const retrievePaymentDetails = async (sessionId: string) => {
        return await paymentService.getSessionDetails(sessionId);
    };

    const updateUserDetails = async (userId: string) => {
        return await dbRepositoryUser.updateProfile(userId, { premium: true });
    };
    const createPayment = async (paymentInfo: IPaymentInfo) => {
        const payment = await createPaymentUseCase(paymentInfo, dbRepositoryPayment);
        console.log(payment);
        return payment;
    };
    const extractPaymentInfo = (sessionDetails: any, userId: string): IPaymentInfo => {
        console.log('Herre comes the sesison details from the stripe')
        console.log(sessionDetails);
        console.log('Herre comes the sesison details from the stripe complete')
        return {
            userId: userId,
            paymentId: sessionDetails.payment_intent,
            amount: sessionDetails.amount_total,
            currency: sessionDetails.currency,
            payment_method: sessionDetails.payment_method_types[0],
            status: sessionDetails.payment_status,
        };
    };
    return {
        getConfig,
        createPaymentSession,
    };
};

export default paymentController;
