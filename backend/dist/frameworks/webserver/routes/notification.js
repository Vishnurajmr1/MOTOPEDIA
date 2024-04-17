"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthMiddleware_1 = __importDefault(require("../middlewares/userAuthMiddleware"));
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const UserRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/UserRepoMongoDb");
const connectionDBRepository_1 = require("../../../application/repositories/connectionDBRepository");
const connectionRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/connectionRepoMongoDb");
const postDBRepository_1 = require("../../../application/repositories/postDBRepository");
const postRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/postRepoMongoDb");
const notificationDBRepository_1 = require("../../../application/repositories/notificationDBRepository");
const notificationRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/notificationRepoMongoDb");
const notificationController_1 = __importDefault(require("../../../adapters/controllers/notificationController"));
const notificationRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, notificationController_1.default)(userDBRepository_1.userDbRepository, UserRepoMongoDb_1.userRepositoryMongoDB, connectionDBRepository_1.connectionDbRepository, connectionRepoMongoDb_1.connectionRepositoryMongoDB, postDBRepository_1.postDbRepository, postRepoMongoDb_1.postRepositoryMongoDb, notificationDBRepository_1.notificationDbRepository, notificationRepoMongoDb_1.notificationRepositoryMongoDb);
    router.use(userAuthMiddleware_1.default);
    router.route('/create').post(controller.createNotification);
    router.route('/').get(controller.getAllNotifications).put(controller.updateAllNotification);
    return router;
};
exports.default = notificationRouter;
//# sourceMappingURL=notification.js.map