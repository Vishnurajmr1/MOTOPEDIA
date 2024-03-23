import { SubscriptionInterval } from '../../../../types/common';
import mongoose from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    features: {
        type: [
            {
                type: String,
                required: true,
            },
        ],
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        enum: Object.values(SubscriptionInterval),
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

const SubscriptionPlan = mongoose.model('Subscription', subscriptionPlanSchema);

export default SubscriptionPlan;
