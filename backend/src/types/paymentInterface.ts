export interface IPaymentInfo {
    userId: string;
    paymentId?: string;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
}

export interface ISubscriptionInfo {
    name: string;
    description: string;
    features: Array<string>;
    price: number;
    duration: string;
    isActive: boolean;
}
export interface IUpdateSubscription {
    name?: string;
    description?: string;
    features?: Array<string>;
    price?: number;
    duration?: string;
    isActive?: boolean;
}
