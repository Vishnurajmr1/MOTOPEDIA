"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const roleCheckMiddleware = (roleToCheck) => {
    return (req, res, next) => {
        var _a;
        const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        console.log(role);
        if (role === roleToCheck) {
            next();
        }
        else {
            throw new appError_1.default('Unauthorized role', HttpStatusCodes_1.default.UNAUTHORIZED);
        }
    };
};
exports.default = roleCheckMiddleware;
//# sourceMappingURL=roleCheckMiddleware.js.map