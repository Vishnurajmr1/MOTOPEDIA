import { PaymentServiceInterface } from '@src/application/services/paymentServiceInterface';

export const getConfigUseCase = (service: ReturnType<PaymentServiceInterface>) => service.getConfig();
export const createSessionsUseCase = (priceId: string, service: ReturnType<PaymentServiceInterface>) =>
    service.createSessions(priceId);
