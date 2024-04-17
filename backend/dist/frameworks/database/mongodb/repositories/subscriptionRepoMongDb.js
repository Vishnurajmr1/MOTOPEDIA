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
exports.subscriptionRepositoryMongoDb = void 0;
const subscriptionPlan_Model_1 = __importDefault(require("../models/subscriptionPlan.Model"));
const subscriptionRepositoryMongoDb = () => {
    const saveSubscription = (subscriptionInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const newSubscription = new subscriptionPlan_Model_1.default(subscriptionInfo);
        const response = newSubscription.save();
        return response;
    });
    const getSubscriptionById = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
        const subscription = yield subscriptionPlan_Model_1.default.findById(subscriptionId);
        return subscription;
    });
    const getSubscriptionList = () => __awaiter(void 0, void 0, void 0, function* () {
        const subscriptionList = yield subscriptionPlan_Model_1.default.find();
        return subscriptionList;
    });
    return {
        saveSubscription,
        getSubscriptionById,
        getSubscriptionList,
    };
};
exports.subscriptionRepositoryMongoDb = subscriptionRepositoryMongoDb;
//# sourceMappingURL=subscriptionRepoMongDb.js.map