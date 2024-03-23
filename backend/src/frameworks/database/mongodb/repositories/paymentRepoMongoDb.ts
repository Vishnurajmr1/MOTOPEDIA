import { IPaymentInfo } from '../../../../types/paymentInterface';
import Payment from '../models/payment';

export const paymentRepositoryMongoDb = () => {
    const savePaymentInfo = async (paymentInfo: IPaymentInfo) => {
        const newPaymentInfo = new Payment(paymentInfo);
        const response = newPaymentInfo.save();
        return response;
    };

    const getMonthlyRevenue = async () => {
        const currentMonth = new Date().getMonth() + 1;
        const pipeLine = [
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$createdAt' }, currentMonth],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' },
                },
            },
        ];
        const revene: Array<{ _id: null; totalAmount: number }> = await Payment.aggregate(pipeLine);
        return revene[0].totalAmount;
    };

    return {
        savePaymentInfo,
        getMonthlyRevenue,
    };
};

export type PaymentImplInterface = typeof paymentRepositoryMongoDb;