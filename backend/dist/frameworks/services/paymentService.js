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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const config_1 = __importDefault(require("../../config"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});
const paymentService = () => {
    const stripeProduct = (name, description, amount, recurring) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield stripe.products.create({
            name: name,
            description: description,
        });
        const price = yield stripe.prices.create({
            unit_amount: amount * 100,
            currency: 'inr',
            recurring: {
                interval: recurring,
            },
            product: product.id,
        });
        console.log(product, price);
        return {
            product,
            price,
        };
    });
    const getStripeProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield stripe.products.retrieve(id);
        return product;
    });
    const stripePlan = (timegap, amount, nickname, productId) => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield stripe.plans.create({
            currency: 'INR',
            interval: timegap,
            product: productId,
            nickname: nickname,
            amount: amount * 100,
            usage_type: 'licensed',
        });
        return plan;
    });
    const stripePaymentCard = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentMethod = yield stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: data.number,
                exp_month: data.expMonth,
                exp_year: data.expYear,
                cvc: data.cvv,
            },
        });
        return paymentMethod;
    });
    const stripeCustomer = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const customer = yield stripe.customers.create({
            email,
        });
        return customer;
    });
    const createSessions = (priceId, customerId) => __awaiter(void 0, void 0, void 0, function* () {
        const sessions = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            currency: 'INR',
            mode: 'subscription',
            success_url: 'http://localhost:4200/pricing/checkout-success',
            cancel_url: 'http://localhost:4200/pricing',
            customer: customerId,
            billing_address_collection: 'required',
        });
        return sessions.id;
    });
    const getSessionDetails = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
        const session = yield stripe.checkout.sessions.retrieve(sessionId);
        return session;
    });
    const getConfig = () => config_1.default.STRIPE_PUBLISHABLE_KEY;
    return {
        getConfig,
        stripeProduct,
        stripePaymentCard,
        stripePlan,
        stripeCustomer,
        getStripeProduct,
        createSessions,
        getSessionDetails,
    };
};
exports.paymentService = paymentService;
//# sourceMappingURL=paymentService.js.map