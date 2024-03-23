import { ISubscriptionInfo } from '../../../types/paymentInterface';
import { subscriptionDbInterface } from '../../../application/repositories/subscriptionDBRepository';

export const createSubscriptionUseCase = async (
    subscriptionData: ISubscriptionInfo,
    subscriptionDbRepository: ReturnType<subscriptionDbInterface>,
) => {
    const subscription = await subscriptionDbRepository.addSubscription(subscriptionData);
    return subscription;
};
