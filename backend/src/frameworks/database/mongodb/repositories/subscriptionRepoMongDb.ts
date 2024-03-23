import { ISubscriptionInfo } from '@src/types/paymentInterface';
import SubscriptionPlan from '../models/subscriptionPlan.Model';

export const subscriptionRepositoryMongoDb = () => {
    const saveSubscription = async (subscriptionInfo: ISubscriptionInfo) => {
        const newSubscription = new SubscriptionPlan(subscriptionInfo);
        const response = newSubscription.save();
        return response;
    };
    const getSubscriptionById = async (subscriptionId: string) => {
        const subscription = await SubscriptionPlan.findById(subscriptionId);
        return subscription;
    };
    const getSubscriptionList = async () => {
        const subscriptionList = await SubscriptionPlan.find();
        return subscriptionList;
    };
    return {
        saveSubscription,
        getSubscriptionById,
        getSubscriptionList,
    };
};

export type SubscriptionRepositoryMongoDb = typeof subscriptionRepositoryMongoDb;
