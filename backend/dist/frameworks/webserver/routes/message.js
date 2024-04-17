"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthMiddleware_1 = __importDefault(require("../middlewares/userAuthMiddleware"));
const messageController_1 = __importDefault(require("../../../adapters/controllers/messageController"));
const cloudServiceInterface_1 = require("../../../application/services/cloudServiceInterface");
const s3Service_1 = require("../../../frameworks/services/s3Service");
const messageRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/messageRepoMongoDb");
const messageDBRepository_1 = require("../../../application/repositories/messageDBRepository");
const chatDBRepository_1 = require("../../../application/repositories/chatDBRepository");
const chatRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/chatRepoMongoDb");
const multer_1 = __importDefault(require("../middlewares/multer"));
const messageRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, messageController_1.default)(cloudServiceInterface_1.cloudServiceInterface, s3Service_1.s3Service, chatDBRepository_1.chatDbRepository, chatRepoMongoDb_1.chatRepositoryMongoDB, messageDBRepository_1.chatMessageDbRepository, messageRepoMongoDb_1.chatMessageRepositoryMongoDB);
    router.use(userAuthMiddleware_1.default);
    router.route('/:chatId').get(controller.getAllMessages).post(multer_1.default.single('image'), controller.sendMessage);
    return router;
};
exports.default = messageRouter;
//# sourceMappingURL=message.js.map