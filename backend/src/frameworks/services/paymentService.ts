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

    const stripeCustomer = async (email: string) => {
        const customer = await stripe.customers.create({
            email,
        });
        return customer;
    };
    const createSessions = async (priceId: string) => {
        const sessions = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            currency: 'INR',
            mode: 'payment',
            success_url: 'http://localhost:4200/pricing/checkout-success',
            cancel_url: 'http://localhost:4200/pricing',
            customer_creation: 'always',
            billing_address_collection: 'required',
        });
        return sessions.id;
    };
    const getSessionDetails = async (sessionId: string) => {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return session;
    };
    const getConfig = () => configKeys.STRIPE_PUBLISHABLE_KEY;

    return {
        getConfig,
        stripeProduct,
        stripePaymentCard,
        stripePlan,
        stripeCustomer,
        getStripeProduct,
        createSessions,
        getSessionDetails
    };
};

export type PaymentServiceImpl = typeof paymentService;
