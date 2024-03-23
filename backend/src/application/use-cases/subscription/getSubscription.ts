import { subscriptionDbInterface } from '@src/application/repositories/subscriptionDBRepository';

export const subscriptionListUseCase = async (subscriptionDbRepository: ReturnType<subscriptionDbInterface>) => {
    const subscriptionList = await subscriptionDbRepository.getSubscriptionList();
    return subscriptionList;
};
export const getSubscriptionByIdUseCase = async (
    subscriptionId: string,
    subscriptionDbRepository: ReturnType<subscriptionDbInterface>,
) => {
    const subscription = await subscriptionDbRepository.getSubscriptionById(subscriptionId);
    return subscription;
};
