"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const configKeys = {
    MONGO_DB_URL: process.env.DATABASE,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    ORIGIN_PORT: process.env.ORIGIN_PORT,
    EMAIL_NODE_MAILER: process.env.EMAIL_NODE_MAILER,
    PASSWORD_NODE_MAILER: process.env.PASSWORD_NODE_MAILER,
    FROM_EMAIL_NODE_MAILER: process.env.FROM_EMAIL_NODE_MAILER,
    JWT_SECRET_EXPIRTATION: process.env.JWT_SECRET_EXPIRATION_HOUR,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    CLOUDFRONT_DISTRIBUTION_ID: process.env.CLOUDFRONT_DISTRIBUTION_ID,
    CLOUDFRONT_DOMAIN_NAME: process.env.CLOUDFRONT_DOMAIN_NAME,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_CURRENCY: process.env.STRIPE_CURRENCY,
    SUCCESS_URL: process.env.SUCCESS_URL,
    CANCEL_URL: process.env.CANCEL_URL,
    WEBPUSH_PUBLIC_KEY: process.env.WEBPUSH_PUBLIC_KEY,
    WEBPUSH_PRIVATE_KEY: process.env.WEBPUSH_PRIVATE_KEY,
};
exports.default = configKeys;
//# sourceMappingURL=config.js.map