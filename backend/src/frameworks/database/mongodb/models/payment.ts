import mongoose, { Schema } from 'mongoose';

interface PaymentI extends Document {
    paymentId: string;
    userId: string;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
    createdAt: Date;
}

// const paymentSchema: Schema<PaymentI> = new Schema({
//     paymentId: {
//         type: String,
//         required: true,
//     },
//     userId: {
//         type: String,
//         required: true,
//     },
//     amount: {
//         type: Number,
//         requried: true,
//     },
//     currency: {
//         type: String,
//         required: true,
//     },
//     payment_method: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         required: true,
//         default: Date.now,
//     },
// });

const paymentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        subscriptionId: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
        },
        paymentId: {
            type: String,
        },
        amount:{
            type:Number
        },
        currency:{
            type:String
        },
        payment_method:{
            type:String
        },
        status:{
            type:String
        }
    },
    { timestamps: true },
);
const Payment = mongoose.model<PaymentI>('Payment', paymentSchema, 'payment');

export default Payment;
