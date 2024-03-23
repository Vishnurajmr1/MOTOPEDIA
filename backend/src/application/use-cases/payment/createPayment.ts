import { PaymentServiceInterface } from "@src/application/services/paymentServiceInterface";

export const getConfigUseCase=(service:ReturnType<PaymentServiceInterface>)=>service.getConfig()