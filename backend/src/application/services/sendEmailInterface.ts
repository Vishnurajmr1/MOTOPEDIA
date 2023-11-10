import { SendEmailService } from '@src/frameworks/services/sendEmailService';
import { MailInterface } from '@src/types/mailInterface';

export const sendEmailServiceInterface = (service: ReturnType<SendEmailService>) => {
    const sendEmail = async (mailInterface:MailInterface)=> {
           return await service.sendEmail(mailInterface);
    };
    return {
        sendEmail,
    };
};
export type SendEmailServiceInterface = typeof sendEmailServiceInterface;
