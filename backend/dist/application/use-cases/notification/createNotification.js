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
exports.createNotificationUseCase = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const common_1 = require("../../../types/common");
const createNotificationUseCase = (senderId, notificationData, notificationDbRepository, userDbRepository, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!senderId || !notificationData) {
            throw new appError_1.default('Invalid input data', HttpStatusCodes_1.default.BAD_REQUEST);
        }
        notificationData.sender = senderId;
        const user = yield userDbRepository.getUserById(senderId);
        let post = null;
        const { postId, actionType } = notificationData;
        if (notificationData.postId) {
            post = yield postDbRepository.getPostById(postId);
            notificationData.recipient = post === null || post === void 0 ? void 0 : post.authorId;
        }
        console.log('It is the notification data');
        console.log(notificationData);
        console.log('It is the notification data output');
        const existingNotification = yield notificationDbRepository.checkExisitingNotification(notificationData);
        console.log(existingNotification);
        if (existingNotification) {
            console.log('hello');
            console.log(existingNotification);
            if (actionType == common_1.NotificationActionType.LIKE) {
            }
        }
        else {
            switch (actionType) {
                case common_1.NotificationActionType.LIKE:
                    if (post) {
                        notificationData.message = `${user === null || user === void 0 ? void 0 : user.firstName} Liked your "${post === null || post === void 0 ? void 0 : post.title}" post.`;
                    }
                    break;
                case common_1.NotificationActionType.COMMENT:
                    if (post) {
                        notificationData.message = `${user === null || user === void 0 ? void 0 : user.firstName} commented  on your "${post.title}".`;
                    }
                    break;
                default:
                    throw new appError_1.default('Unsupported action type', HttpStatusCodes_1.default.BAD_REQUEST);
            }
        }
        const payload = yield notificationDbRepository.addNotification(notificationData);
        console.log(payload);
        return payload;
    }
    catch (error) {
        throw new appError_1.default('Internal server error', HttpStatusCodes_1.default.BAD_GATEWAY);
    }
});
exports.createNotificationUseCase = createNotificationUseCase;
//# sourceMappingURL=createNotification.js.map