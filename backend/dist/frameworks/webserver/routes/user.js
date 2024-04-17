"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../../../adapters/controllers/userController"));
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const authService_1 = require("../../../frameworks/services/authService");
const express_1 = __importDefault(require("express"));
const userAuthMiddleware_1 = __importDefault(require("../middlewares/userAuthMiddleware"));
const authServicesInterface_1 = require("../../../application/services/authServicesInterface");
const UserRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/UserRepoMongoDb");
const roleCheckMiddleware_1 = __importDefault(require("../middlewares/roleCheckMiddleware"));
const connectionDBRepository_1 = require("../../../application/repositories/connectionDBRepository");
const connectionRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/connectionRepoMongoDb");
const cloudServiceInterface_1 = require("../../../application/services/cloudServiceInterface");
const s3Service_1 = require("../../../frameworks/services/s3Service");
const multer_1 = __importDefault(require("../middlewares/multer"));
const userRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(authServicesInterface_1.authServiceInterface, authService_1.authService, userDBRepository_1.userDbRepository, UserRepoMongoDb_1.userRepositoryMongoDB, connectionDBRepository_1.connectionDbRepository, connectionRepoMongoDb_1.connectionRepositoryMongoDB, cloudServiceInterface_1.cloudServiceInterface, s3Service_1.s3Service);
    router.get('/get-all-users', userAuthMiddleware_1.default, controller.getAllUsers);
    router.patch('/block-user/:userId', userAuthMiddleware_1.default, (0, roleCheckMiddleware_1.default)('admin'), controller.blockUser);
    router.patch('/unblock-user/:userId', userAuthMiddleware_1.default, (0, roleCheckMiddleware_1.default)('admin'), controller.unblockUser);
    router.route('/get-user-details').get(userAuthMiddleware_1.default, controller.getUserDetails);
    router.route('/follow/:id').post(userAuthMiddleware_1.default, controller.followUser);
    router.route('/unfollow/:id').post(userAuthMiddleware_1.default, controller.unfollowUser);
    router.route('/connection').get(userAuthMiddleware_1.default, controller.getConnections);
    router.route('/get-user/:id').get(userAuthMiddleware_1.default, controller.getOtherUserDetails);
    router.route('/update-profile').put(userAuthMiddleware_1.default, multer_1.default.single('image'), controller.editUserDetails);
    router.route('/search-user').get(userAuthMiddleware_1.default, controller.searchUser);
    router.route('/profile-pic').patch(userAuthMiddleware_1.default, multer_1.default.single('image'), controller.editUserDetails);
    router.route('/users').get(userAuthMiddleware_1.default, controller.searchAvailableUsers);
    return router;
};
exports.default = userRouter;
//# sourceMappingURL=user.js.map