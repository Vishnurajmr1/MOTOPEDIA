"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = __importDefault(require("../../../adapters/controllers/chatController"));
const userAuthMiddleware_1 = __importDefault(require("../middlewares/userAuthMiddleware"));
const chatDBRepository_1 = require("../../../application/repositories/chatDBRepository");
const chatRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/chatRepoMongoDb");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const UserRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/UserRepoMongoDb");
const chatRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, chatController_1.default)(chatDBRepository_1.chatDbRepository, chatRepoMongoDb_1.chatRepositoryMongoDB, userDBRepository_1.userDbRepository, UserRepoMongoDb_1.userRepositoryMongoDB);
    router.use(userAuthMiddleware_1.default);
    router.route('/').get(controller.getAllChats);
    router.route('/c/:receiverId').post(controller.createChat);
    return router;
};
exports.default = chatRouter;
//# sourceMappingURL=chat.js.map