"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServiceInterface = void 0;
const paymentServiceInterface = (service) => {
    const getConfig = () => service.getConfig();
    const createSessions = (priceId, customerId) => service.createSessions(priceId, customerId);
    const createCustomer = (userEmail) => service.stripeCustomer(userEmail);
    const getSessionDetails = (sessionId) => service.getSessionDetails(sessionId);
    const createProduct = (name, description, amount, recurring) => service.stripeProduct(name, description, amount, recurring);
    return {
        getConfig,
        createSessions,
        createCustomer,
        getSessionDetails,
        createProduct,
    };
};
exports.paymentServiceInterface = paymentServiceInterface;
//# sourceMappingURL=paymentServiceInterface.js.map