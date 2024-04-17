"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const hashPassword = (password) => service.hashPassword(password);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    const verifyPassword = (token) => service.verifyToken(token);
    const generateToken = (payload) => service.generateToken(payload);
    const generateRefreshToken = (payload) => service.generateRefreshToken(payload);
    const decodedTokenAndReturnExpireDate = (token) => service.decodedTokenAndReturnExpireDate(token);
    const decodeToken = (token) => service.decodeToken(token);
    return {
        hashPassword,
        comparePassword,
        verifyPassword,
        generateToken,
        generateRefreshToken,
        decodedTokenAndReturnExpireDate,
        decodeToken,
    };
};
exports.authServiceInterface = authServiceInterface;
//# sourceMappingURL=authServicesInterface.js.map