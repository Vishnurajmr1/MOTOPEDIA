"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//GENERATE OTP
const generateOtp = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
exports.default = generateOtp;
//# sourceMappingURL=generateOtp.js.map