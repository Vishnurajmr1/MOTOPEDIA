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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const HttResponseStatus_1 = __importDefault(require("../../constants/HttResponseStatus"));
const createNotification_1 = require("../../application/use-cases/notification/createNotification");
const socket_1 = require("../../frameworks/websocket/socket");
const chatEventEnum_1 = require("../../constants/chatEventEnum");
const getAllNotification_1 = require("../../application/use-cases/notification/getAllNotification");
const updateNotification_1 = require("../../application/use-cases/notification/updateNotification");
const notificationController = (userDbRepository, userDbRepositoryImplementation, connectionDbRepository, connectionDbRepositoryImplementation, postDbRepository, postDbRepositoryImplementation, notificationDbRepository, notificationDbRepositoryImplementaiton) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImplementation());
    const dbRepositoryPost = postDbRepository(postDbRepositoryImplementation());
    const dbRepositoryConnection = connectionDbRepository(connectionDbRepositoryImplementation());
    const dbRepositoryNotification = notificationDbRepository(notificationDbRepositoryImplementaiton());
    const createNotification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        const notificationData = req.body;
        const result = yield (0, createNotification_1.createNotificationUseCase)(senderId, notificationData, dbRepositoryNotification, dbRepositoryUser, dbRepositoryPost);
        if (result.recipient) {
            (0, socket_1.emitSocketEvent)(req, result.recipient._id.toString(), chatEventEnum_1.ChatEventEnum.NOTIFICATION_RECEIVED_EVENT, result);
        }
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully created a notification',
            data: result,
        });
    }));
    const getAllNotifications = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const recipientId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        const result = yield (0, getAllNotification_1.getAllNotificationsUseCase)(recipientId, dbRepositoryNotification);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully get all notifications',
            data: result,
        });
    }));
    const updateAllNotification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const recipientId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.Id;
        const result = yield (0, updateNotification_1.updateNotificationUseCase)(recipientId, dbRepositoryNotification);
        res.status(200).json({
            status: HttResponseStatus_1.default.SUCCESS,
            message: 'Successfully updated the notification',
            data: result,
        });
    }));
    return {
        createNotification,
        getAllNotifications,
        updateAllNotification,
    };
};
exports.default = notificationController;
//# sourceMappingURL=notificationController.js.map