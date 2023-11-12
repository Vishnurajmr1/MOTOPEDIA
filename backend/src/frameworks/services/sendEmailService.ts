import nodemailer, { Transporter } from 'nodemailer';
import configKeys from '../../config';
import { MailInterface } from '@src/types/mailInterface';

export const sendEmailService = () => {
    const transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: configKeys.EMAIL_NODE_MAILER as string,
            pass: configKeys.PASSWORD_NODE_MAILER as string,
        },
    });
    const sendEmail = async (options: MailInterface) => {
        return await transporter
            .sendMail({
                from: configKeys.EMAIL_NODE_MAILER,
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
