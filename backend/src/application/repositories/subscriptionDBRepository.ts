import { SubscriptionRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/subscriptionRepoMongDb';
import { AddSubscription, ISubscriptionInfo } from '../../types/paymentInterface';

export const subscriptionDbRepository = (repository: ReturnType<SubscriptionRepositoryMongoDb>) => {
    const addSubscription = async (SubInfo: AddSubscription) => await repository.saveSubscription(SubInfo);
    const getSubscriptionById = async (subId: string) => await repository.getSubscriptionById(subId);
    const getSubscriptionList = async () => await repository.getSubscriptionList();
    return {
        addSubscription,
        getSubscriptionById,
        getSubscriptionList,
    };
};

export type subscriptionDbInterface = typeof subscriptionDbRepository;
