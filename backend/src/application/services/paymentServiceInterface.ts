import { PaymentServiceImpl } from '@src/frameworks/services/paymentService';

export const paymentServiceInterface = (service: ReturnType<PaymentServiceImpl>) => {
    const getConfig = () => service.getConfig();

    return {
        getConfig,
    };
};

export type PaymentServiceInterface = typeof paymentServiceInterface;
