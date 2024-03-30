import { ISubscriptionInfo } from '../../../types/paymentInterface';
import { subscriptionDbInterface } from '../../../application/repositories/subscriptionDBRepository';
import { PaymentServiceInterface } from '@src/application/services/paymentServiceInterface';

export const createSubscriptionUseCase = async (
    subscriptionData: ISubscriptionInfo,
    subscriptionDbRepository: ReturnType<subscriptionDbInterface>,
    stripeService: ReturnType<PaymentServiceInterface>,
) => {
    const subscription = await subscriptionDbRepository.addSubscription(subscriptionData);
    return subscription;
};
