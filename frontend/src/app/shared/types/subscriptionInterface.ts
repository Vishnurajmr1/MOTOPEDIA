import { SubscriptionType } from '.';

export interface ISubscription {
  name: string | undefined;
  description: string | undefined;
  features: Array<string>;
  price: number;
  duration: SubscriptionType;
  isActive: boolean;
}
export interface IGetSubscription extends ISubscription {
  stripeProductId: string;
  stripePriceId: string;
}
export interface IStripeSubscription {
  data: string;
  status: number;
  message: string;
}
