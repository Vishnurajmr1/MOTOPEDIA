import { PaymentServiceImpl } from '@src/frameworks/services/paymentService';

export const paymentServiceInterface = (service: ReturnType<PaymentServiceImpl>) => {
    const getConfig = () => service.getConfig();
    const createSessions=(priceId:string)=>service.createSessions(priceId);
    return {
        getConfig,
        createSessions
    };
};

export type PaymentServiceInterface = typeof paymentServiceInterface;
