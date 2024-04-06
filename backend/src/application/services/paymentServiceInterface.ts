import { PaymentServiceImpl } from '@src/frameworks/services/paymentService';

export const paymentServiceInterface = (service: ReturnType<PaymentServiceImpl>) => {
    const getConfig = () => service.getConfig();
    const createSessions = (priceId: string,customerId:string) => service.createSessions(priceId,customerId);
    const createCustomer = (userEmail: string) => service.stripeCustomer(userEmail);
    const getSessionDetails = (sessionId: string) => service.getSessionDetails(sessionId);
    const createProduct = (name: string, description: string, amount: number, recurring: string) =>
        service.stripeProduct(name, description, amount, recurring);
    return {
        getConfig,
        createSessions,
        createCustomer,
        getSessionDetails,
        createProduct,
    };
};

export type PaymentServiceInterface = typeof paymentServiceInterface;
