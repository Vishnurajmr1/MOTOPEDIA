import { Interval, stripeCard } from '@src/types/common';
import configKeys from '../../config';
import Stripe from 'stripe';

const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});

export const paymentService = () => {
    const stripeProduct = async (name: string) => {
        const product = await stripe.products.create({
            name: name,
        });
        return product;
    };
    const getStripeProduct = async (id: string) => {
        const product = await stripe.products.retrieve(id);
        return product;
    };

    const stripePlan = async (timegap: Interval, amount: number, nickname: string, productId: string) => {
        const plan = await stripe.plans.create({
            currency: 'INR',
            interval: timegap,
            product: productId,
            nickname: nickname,
            amount: amount * 100,
            usage_type: 'licensed',
        });
        return plan;
    };
    const stripePaymentCard = async (data: stripeCard) => {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: data.number,
                exp_month: data.expMonth,
                exp_year: data.expYear,
                cvc: data.cvv,
            },
        });
        return paymentMethod;
    };

    const stripeCustomer = async (email:string) => {
        const customer = await stripe.customers.create({
            email,
        });
        return customer;
    };
    const getConfig = () => configKeys.STRIPE_PUBLISHABLE_KEY;

    return {
        getConfig,
        stripeProduct,
        stripePaymentCard,
        stripePlan,
        stripeCustomer,
        getStripeProduct,
    };
};

export type PaymentServiceImpl = typeof paymentService;
