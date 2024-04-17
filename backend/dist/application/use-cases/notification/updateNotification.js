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
exports.updateNotificationUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const updateNotificationUseCase = (recipient, notificationDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!recipient) {
            throw new appError_1.default('Please provide a proper id', HttpStatusCodes_1.default.BAD_REQUEST);
        }
        const payload = yield notificationDbRepository.updateAllNotification(recipient);
        return payload;
    }
    catch (error) {
        throw new appError_1.default('Internal server error', HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR);
    }
});
exports.updateNotificationUseCase = updateNotificationUseCase;
//# sourceMappingURL=updateNotification.js.map