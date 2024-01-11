import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const configKeys = {
    MONGO_DB_URL: process.env.DATABASE as string,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    NODE_ENV: process.env.NODE_ENV as string,
    ORIGIN_PORT:process.env.ORIGIN_PORT as string,
    EMAIL_NODE_MAILER: process.env.EMAIL_NODE_MAILER as string,
    PASSWORD_NODE_MAILER: process.env.PASSWORD_NODE_MAILER as string,
    FROM_EMAIL_NODE_MAILER: process.env.FROM_EMAIL_NODE_MAILER as string,
    JWT_SECRET_EXPIRTATION: process.env.JWT_SECRET_EXPIRATION_HOUR as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY  as string,
    AWS_SECRET_KEY:process.env.AWS_SECRET_KEY as string,
    AWS_BUCKET_REGION:process.env.AWS_BUCKET_REGION as string,
    AWS_BUCKET_NAME:process.env.AWS_BUCKET_NAME as string,
    CLOUDFRONT_DISTRIBUTION_ID:process.env.CLOUDFRONT_DISTRIBUTION_ID as string,
    CLOUDFRONT_DOMAIN_NAME:process.env.CLOUDFRONT_DOMAIN_NAME as string,  
};
export default configKeys;
