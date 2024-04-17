"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const authService_1 = require("../../../frameworks/services/authService");
const appError_1 = __importDefault(require("../../../utils/appError"));
const jwtAuthMiddleware = (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        throw new appError_1.default('Token not found', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    try {
        const { payload, expired } = (0, authService_1.authService)().verifyToken(token);
        req.user = payload;
        next();
    }
    catch (error) {
        throw new appError_1.default('Session is expired please login again', HttpStatusCodes_1.default.FORBIDDEN);
    }
};
exports.default = jwtAuthMiddleware;
//# sourceMappingURL=userAuthMiddleware.js.map