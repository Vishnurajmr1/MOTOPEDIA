"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../types/common");
const mongoose_1 = __importDefault(require("mongoose"));
const subscriptionPlanSchema = new mongoose_1.default.Schema({
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
        enum: Object.values(common_1.SubscriptionInterval),
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    stripeProductId: {
        type: String
    },
    stripePriceId: {
        type: String
    }
}, { timestamps: true });
const SubscriptionPlan = mongoose_1.default.model('Subscription', subscriptionPlanSchema);
exports.default = SubscriptionPlan;
//# sourceMappingURL=subscriptionPlan.Model.js.map