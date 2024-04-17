"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const sendEmailService = () => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.EMAIL_NODE_MAILER,
            pass: config_1.default.PASSWORD_NODE_MAILER,
        },
    });
    const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
        return yield transporter
            .sendMail({
            from: config_1.default.EMAIL_NODE_MAILER,
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
    });
    return {
        sendEmail,
    };
};
exports.sendEmailService = sendEmailService;
//# sourceMappingURL=sendEmailService.js.map