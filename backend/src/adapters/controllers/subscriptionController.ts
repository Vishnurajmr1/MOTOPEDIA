import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { subscriptionDbInterface } from '../../application/repositories/subscriptionDBRepository';
import { SubscriptionRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/subscriptionRepoMongDb';
import { ISubscriptionInfo, IUpdateSubscription } from '../../types/paymentInterface';
import { createSubscriptionUseCase } from '../../application/use-cases/subscription/createSubscription';
import Status from '../../constants/HttResponseStatus';
import {
    getSubscriptionByIdUseCase,
    subscriptionListUseCase,
} from '../../application/use-cases/subscription/getSubscription';
import { PaymentServiceInterface } from '../../application/services/paymentServiceInterface';
import { PaymentServiceImpl } from '../../frameworks/services/paymentService';
const subscriptionController = (
    subscriptionDbRepository: subscriptionDbInterface,
    subscriptionDbRepositoryImplementation: SubscriptionRepositoryMongoDb,
    stripeServiceInterface: PaymentServiceInterface,
    stripeServiceImpl: PaymentServiceImpl,
) => {
    const dbRepositorySubscription = subscriptionDbRepository(subscriptionDbRepositoryImplementation());
    const stripeService = stripeServiceInterface(stripeServiceImpl());
    const createSubscription = asyncHandler(async (req: Request, res: Response) => {
        const subData: ISubscriptionInfo = req.body;
        const subscription = await createSubscriptionUseCase(subData,dbRepositorySubscription,stripeService);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully created Subscription',
            data: subscription,
        });
    });
    const updateSubscription = asyncHandler(async (req: Request, res: Response) => {
        const updateData: IUpdateSubscription = req.body;
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully updated the subscription',
            data: updateData,
        });
    });
    const SubscriptionList = asyncHandler(async (req: Request, res: Response) => {
        const subscriptionList = await subscriptionListUseCase(dbRepositorySubscription);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully fetched subscription List',
            data: subscriptionList,
        });
    });
    const getSubscriptionById = asyncHandler(async (req: Request, res: Response) => {
        const subscriptionId = req.params.id;
        const getSubscription = await getSubscriptionByIdUseCase(subscriptionId, dbRepositorySubscription);
        res.status(200).json({
            status: Status.SUCCESS,
            message: 'Successfully fetched subscription',
            data: getSubscription,
        });
    });
    return {
        createSubscription,
        updateSubscription,
        SubscriptionList,
        getSubscriptionById,
    };
};

export default subscriptionController;
