export interface JwtPayload {
    Id: string;
    email: string;
    role: string;
}
export interface UploadedFileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    path: string;
    size: number;
    filename: string;
}

export type Interval = 'month' | 'day' | 'year' | 'week';

export interface stripeCard {
    number: string;
    expMonth: number;
    expYear: number;
    cvv: string;
}
export interface stripeAddress {
    name: string;
    phone: number;
}

export enum PlanType {
    basic = 'BASIC',
    pro = 'PRO',
    premium = 'PREMIUM',
}
export enum PaymentStatus {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
}
export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    CANCELED = 'CANCELED',
}

export enum SubscriptionInterval{
    YEAR='YEAR',
    MONTH='MONTHLY',
    DAY='DAY',
    WEEK='WEEK'
}

export enum NotificationActionType{
    LIKE='like_post',
    COMMENT='post_comment',
    NEWPOST='new_post'
}
