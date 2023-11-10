import nodemailer, { Transporter } from 'nodemailer';
import configKeys from '../../config';
import { MailInterface } from '@src/types/mailInterface';

export const sendEmailService = () => {
    const transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
            user:configKeys.EMAIL_NODE_MAILER,
            pass:configKeys.APP_PASSWORD
        },
    });
    const sendEmail = async (options: MailInterface) => {
        return await transporter
            .sendMail({
                from: configKeys.FROM_EMAIL_NODE_MAILER,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
            })
            .then((info) => {
                console.log('Mail send successfully');
                return info;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    };
    return {
        sendEmail,
    };
};

export type SendEmailService = typeof sendEmailService;
