import { PaymentImplInterface } from '../../frameworks/database/mongodb/repositories/paymentRepoMongoDb';
import { IPaymentInfo } from '../../types/paymentInterface';

export const paymentInterface = (repository: ReturnType<PaymentImplInterface>) => {
    const savePayment = async (paymentInfo: IPaymentInfo) => await repository.savePaymentInfo(paymentInfo);
    const getMonthlyRevenue = async () => await repository.getMonthlyRevenue();

    return {
        savePayment,
        getMonthlyRevenue,
    };
};

export type PaymentDbInterface = typeof paymentInterface;
