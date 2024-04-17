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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const createPayment_1 = require("../../application/use-cases/payment/createPayment");
const HttResponseStatus_1 = __importDefault(require("../../constants/HttResponseStatus"));
const paymentController = (paymentServiceInterface, paymentServiceImpl, subscriptionDbRepository, subscriptionDbRepositoryImplementation, paymentDbRepository, paymentDbRepositoryImplementation, userDbRepository, userDbRepositoryImplementation) => {
    const paymentService = paymentServiceInterface(paymentServiceImpl());
    const dbRepositorySubscription = subscriptionDbRepository(subscriptionDbRepositoryImplementation());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const dbRepositoryPayment = paymentDbRepository(paymentDbRepositoryImplementation());
    const getConfig = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const config = (0, createPayment_1.getConfigUseCase)(paymentService);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'successfully completed payment',
            data: config,
        });
    }));
    const createStripeCustomer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userEmail = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.email) || '';
        const stripeCustomer = yield (0, createPayment_1.createCustomerUseCase)(userEmail, paymentService);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Stripe customer creation Successfull',
            data: stripeCustomer,
        });
    }));
    const createPaymentSession = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        const priceId = req.body.priceId;
        const customerId = (yield (0, createPayment_1.createCustomerUseCase)((_b = req.user) === null || _b === void 0 ? void 0 : _b.email, paymentService)).id;
        const paymentSessionId = yield (0, createPayment_1.createSessionsUseCase)(priceId, customerId, paymentService);
        const userId = ((_c = req.user) === null || _c === void 0 ? void 0 : _c.Id) || '';
        const sessionDetails = yield retrievePaymentDetails(paymentSessionId);
        const paymentInfo = extractPaymentInfo(sessionDetails, userId);
        console.log('paymentInfo started');
        console.log(paymentInfo);
        console.log('paymentInfo Completed done');
        yield createPayment(paymentInfo);
        const updatedDetails = yield updateUserDetails(userId);
        console.log('Session Details fetched');
        console.log(sessionDetails);
        console.log('Session Details fetched Completed');
        console.log('updated Details fetched Started');
        console.log(updatedDetails);
        console.log('Updated Details done true');
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'successfully created session',
            data: paymentSessionId,
        });
    }));
    const retrievePaymentDetails = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield paymentService.getSessionDetails(sessionId);
    });
    const updateUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield dbRepositoryUser.updateProfile(userId, { premium: true });
    });
    const createPayment = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const payment = yield (0, createPayment_1.createPaymentUseCase)(paymentInfo, dbRepositoryPayment);
        console.log(payment);
        return payment;
    });
    const extractPaymentInfo = (sessionDetails, userId) => {
        console.log('Herre comes the sesison details from the stripe');
        console.log(sessionDetails);
        console.log('Herre comes the sesison details from the stripe complete');
        return {
            userId: userId,
            paymentId: sessionDetails.payment_intent,
            amount: sessionDetails.amount_total,
            currency: sessionDetails.currency,
            payment_method: sessionDetails.payment_method_types[0],
            status: sessionDetails.payment_status,
        };
    };
    return {
        getConfig,
        createPaymentSession,
    };
};
exports.default = paymentController;
//# sourceMappingURL=paymentController.js.map