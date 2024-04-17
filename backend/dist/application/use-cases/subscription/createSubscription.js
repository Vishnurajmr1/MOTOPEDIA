"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionUseCase = void 0;
const createSubscriptionUseCase = (subscriptionData, subscriptionDbRepository, stripeService) => __awaiter(void 0, void 0, void 0, function* () {
    let duration = '';
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
    const stripeProduct = yield stripeService.createProduct(subscriptionData.name, subscriptionData.description, subscriptionData.price, duration);
    const saveSubscription = {
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
    const subscription = yield subscriptionDbRepository.addSubscription(saveSubscription);
    console.log(subscription, stripeProduct);
    return subscription;
});
exports.createSubscriptionUseCase = createSubscriptionUseCase;
//# sourceMappingURL=createSubscription.js.map