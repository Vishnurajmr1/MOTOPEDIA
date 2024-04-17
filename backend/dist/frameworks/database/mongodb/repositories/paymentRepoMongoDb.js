"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRepositoryMongoDb = void 0;
const payment_1 = __importDefault(require("../models/payment"));
const paymentRepositoryMongoDb = () => {
    const savePaymentInfo = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const newPaymentInfo = new payment_1.default(paymentInfo);
        const response = newPaymentInfo.save();
        return response;
    });
    const getMonthlyRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
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
        const revene = yield payment_1.default.aggregate(pipeLine);
        return revene[0].totalAmount;
    });
    return {
        savePaymentInfo,
        getMonthlyRevenue,
    };
};
exports.paymentRepositoryMongoDb = paymentRepositoryMongoDb;
//# sourceMappingURL=paymentRepoMongoDb.js.map