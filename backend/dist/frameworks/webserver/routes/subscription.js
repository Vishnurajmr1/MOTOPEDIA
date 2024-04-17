"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscriptionController_1 = __importDefault(require("../../../adapters/controllers/subscriptionController"));
const subscriptionDBRepository_1 = require("../../../application/repositories/subscriptionDBRepository");
const subscriptionRepoMongDb_1 = require("../../../frameworks/database/mongodb/repositories/subscriptionRepoMongDb");
const express_1 = __importDefault(require("express"));
const roleCheckMiddleware_1 = __importDefault(require("../middlewares/roleCheckMiddleware"));
const userAuthMiddleware_1 = __importDefault(require("../middlewares/userAuthMiddleware"));
const paymentService_1 = require("../../../frameworks/services/paymentService");
const paymentServiceInterface_1 = require("../../../application/services/paymentServiceInterface");
const subscriptionRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, subscriptionController_1.default)(subscriptionDBRepository_1.subscriptionDbRepository, subscriptionRepoMongDb_1.subscriptionRepositoryMongoDb, paymentServiceInterface_1.paymentServiceInterface, paymentService_1.paymentService);
    router
        .route('/')
        .post(userAuthMiddleware_1.default, (0, roleCheckMiddleware_1.default)('admin'), controller.createSubscription)
        .get(controller.SubscriptionList);
    router.route('/:id').get(controller.getSubscriptionById);
    return router;
};
exports.default = subscriptionRouter;
//# sourceMappingURL=subscription.js.map