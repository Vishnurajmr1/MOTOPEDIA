import { PaymentDbInterface } from '@src/application/repositories/paymentDBRepository';
import { PaymentServiceInterface } from '@src/application/services/paymentServiceInterface';
import { PaymentImplInterface } from '@src/frameworks/database/mongodb/repositories/paymentRepoMongoDb';
import { IPaymentInfo } from '@src/types/paymentInterface';

export const getConfigUseCase = (service: ReturnType<PaymentServiceInterface>) => service.getConfig();
export const createSessionsUseCase = (priceId: string,customerId:string, service: ReturnType<PaymentServiceInterface>) =>
    service.createSessions(priceId,customerId);
export const createCustomerUseCase = (userEmail: string, service: ReturnType<PaymentServiceInterface>) =>
    service.createCustomer(userEmail);
export const createPaymentUseCase = (
    paymentData: IPaymentInfo,
    paymentDbRepository: ReturnType<PaymentDbInterface>,
) => paymentDbRepository.savePayment(paymentData);
