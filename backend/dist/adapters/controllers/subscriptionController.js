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
const createSubscription_1 = require("../../application/use-cases/subscription/createSubscription");
const HttResponseStatus_1 = __importDefault(require("../../constants/HttResponseStatus"));
const getSubscription_1 = require("../../application/use-cases/subscription/getSubscription");
const subscriptionController = (subscriptionDbRepository, subscriptionDbRepositoryImplementation, stripeServiceInterface, stripeServiceImpl) => {
    const dbRepositorySubscription = subscriptionDbRepository(subscriptionDbRepositoryImplementation());
    const stripeService = stripeServiceInterface(stripeServiceImpl());
    const createSubscription = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subData = req.body;
        const subscription = yield (0, createSubscription_1.createSubscriptionUseCase)(subData, dbRepositorySubscription, stripeService);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully created Subscription',
            data: subscription,
        });
    }));
    const updateSubscription = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updateData = req.body;
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully updated the subscription',
            data: updateData,
        });
    }));
    const SubscriptionList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subscriptionList = yield (0, getSubscription_1.subscriptionListUseCase)(dbRepositorySubscription);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully fetched subscription List',
            data: subscriptionList,
        });
    }));
    const getSubscriptionById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subscriptionId = req.params.id;
        const getSubscription = yield (0, getSubscription_1.getSubscriptionByIdUseCase)(subscriptionId, dbRepositorySubscription);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully fetched subscription',
            data: getSubscription,
        });
    }));
    return {
        createSubscription,
        updateSubscription,
        SubscriptionList,
        getSubscriptionById,
    };
};
exports.default = subscriptionController;
//# sourceMappingURL=subscriptionController.js.map