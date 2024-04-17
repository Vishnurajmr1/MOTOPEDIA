"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentUseCase = exports.createCustomerUseCase = exports.createSessionsUseCase = exports.getConfigUseCase = void 0;
const getConfigUseCase = (service) => service.getConfig();
exports.getConfigUseCase = getConfigUseCase;
const createSessionsUseCase = (priceId, customerId, service) => service.createSessions(priceId, customerId);
exports.createSessionsUseCase = createSessionsUseCase;
const createCustomerUseCase = (userEmail, service) => service.createCustomer(userEmail);
exports.createCustomerUseCase = createCustomerUseCase;
const createPaymentUseCase = (paymentData, paymentDbRepository) => paymentDbRepository.savePayment(paymentData);
exports.createPaymentUseCase = createPaymentUseCase;
//# sourceMappingURL=createPayment.js.map