import { PaymentServiceImpl } from '@src/frameworks/services/paymentService';

export const paymentServiceInterface = (service: ReturnType<PaymentServiceImpl>) => {
    const getConfig = () => service.getConfig();
    const createSessions=(priceId:string)=>service.createSessions(priceId);
    const createCustomer=(userEmail:string)=>service.stripeCustomer(userEmail);
    const getSessionDetails=(sessionId:string)=>service.getSessionDetails(sessionId);
    return {
        getConfig,
        createSessions,
        createCustomer,
        getSessionDetails
    };
};

export type PaymentServiceInterface = typeof paymentServiceInterface;
