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
exports.notificationRepositoryMongoDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notification_Model_1 = __importDefault(require("../models/notification.Model"));
const notificationRepositoryMongoDb = () => {
    const addNotification = (addNotification) => __awaiter(void 0, void 0, void 0, function* () {
        const newNotification = new notification_Model_1.default(addNotification);
        const notification = yield newNotification.save();
        return notification;
    });
    const getAllNotifications = (recipientId) => __awaiter(void 0, void 0, void 0, function* () {
        const notifications = yield notification_Model_1.default.find({ recipient: recipientId })
            .sort({ createdAt: -1 })
            .populate('sender');
        return notifications;
    });
    const checkExisitingNotification = (notification) => __awaiter(void 0, void 0, void 0, function* () {
        const existingNotification = yield notification_Model_1.default.aggregate([
            {
                $match: {
                    sender: new mongoose_1.default.Types.ObjectId(notification.sender),
                    recipient: notification.recipient,
                    postId: new mongoose_1.default.Types.ObjectId(notification.postId),
                    actionType: notification.actionType,
                },
            },
        ]);
        if (existingNotification.length) {
            return existingNotification[0];
        }
    });
    const updateNotification = (notificationId, data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield notification_Model_1.default.findByIdAndUpdate({ _id: notificationId }, Object.assign({}, data), { new: true });
        return response;
    });
    const updateNotificationAsRead = (recipient) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield notification_Model_1.default.updateMany({ recipient: recipient, readBy: false }, { $set: { readBy: true } });
        return response;
    });
    return {
        addNotification,
        getAllNotifications,
        checkExisitingNotification,
        updateNotification,
        updateNotificationAsRead,
    };
};
exports.notificationRepositoryMongoDb = notificationRepositoryMongoDb;
//# sourceMappingURL=notificationRepoMongoDb.js.map