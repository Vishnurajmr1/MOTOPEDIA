import { SendEmailService } from '../../frameworks/services/sendEmailService';
import { MailInterface } from '../../types/mailInterface';

export const sendEmailServiceInterface = (service: ReturnType<SendEmailService>) => {
    const sendEmail = async (mailInterface: MailInterface) => {
        return await service.sendEmail(mailInterface);
    };
    return {
        sendEmail,
    };
};
export type SendEmailServiceInterface = typeof sendEmailServiceInterface;
