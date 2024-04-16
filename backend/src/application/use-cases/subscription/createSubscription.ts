import { AddSubscription, ISubscriptionInfo } from '../../../types/paymentInterface';
import { subscriptionDbInterface } from '../../../application/repositories/subscriptionDBRepository';
import { PaymentServiceInterface } from '../../../application/services/paymentServiceInterface';

export const createSubscriptionUseCase = async (
    subscriptionData: ISubscriptionInfo,
    subscriptionDbRepository: ReturnType<subscriptionDbInterface>,
    stripeService: ReturnType<PaymentServiceInterface>,
) => {
    let duration: string = '';
    switch (subscriptionData.duration) {
        case 'MONTHLY':
            duration = 'month';
            break;
        case 'WEEK':
            duration = 'week';
            break;
        case 'DAY':
            duration = 'day';
            break;
        default:
            'Invalid';
            break;
    }
    const stripeProduct = await stripeService.createProduct(
        subscriptionData.name,
        subscriptionData.description,
        subscriptionData.price,
        duration,
    );
    const saveSubscription: AddSubscription = {
        stripeProductId: stripeProduct.product.id,
        stripePriceId: stripeProduct.price.id,
        name: subscriptionData.name,
        description: subscriptionData.description,
        features: subscriptionData.features,
        price: subscriptionData.price,
        duration: subscriptionData.duration,
        isActive: stripeProduct.product.active,
    };
    console.log('stripe product');
    console.log(stripeProduct);
    const subscription = await subscriptionDbRepository.addSubscription(saveSubscription);
    console.log(subscription, stripeProduct);
    return subscription;
};
