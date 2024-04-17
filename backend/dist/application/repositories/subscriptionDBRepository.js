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
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionDbRepository = void 0;
const subscriptionDbRepository = (repository) => {
    const addSubscription = (SubInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.saveSubscription(SubInfo); });
    const getSubscriptionById = (subId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getSubscriptionById(subId); });
    const getSubscriptionList = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getSubscriptionList(); });
    return {
        addSubscription,
        getSubscriptionById,
        getSubscriptionList,
    };
};
exports.subscriptionDbRepository = subscriptionDbRepository;
//# sourceMappingURL=subscriptionDBRepository.js.map