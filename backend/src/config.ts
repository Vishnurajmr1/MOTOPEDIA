import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const configKeys = {
    MONGO_DB_URL: process.env.DATABASE as string,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    NODE_ENV: process.env.NODE_ENV as string,
    EMAIL_NODE_MAILER: process.env.EMAIL_NODE_MAILER as string,
    PASSWORD_NODE_MAILER: process.env.PASSWORD_NODE_MAILER as string,
    FROM_EMAIL_NODE_MAILER: process.env.FROM_EMAIL_NODE_MAILER as string,
    JWT_SECRET_EXPIRTATION: process.env.JWT_SECRET_EXPIRATION_HOUR as string,
};
export default configKeys;
