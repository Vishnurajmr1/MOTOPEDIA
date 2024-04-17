"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paymentServiceInterface_1 = require("../../../application/services/paymentServiceInterface");
const paymentController_1 = __importDefault(require("../../../adapters/controllers/paymentController"));
const express_1 = __importDefault(require("express"));
const paymentService_1 = require("../../../frameworks/services/paymentService");
const userDBRepository_1 = require("../../../application/repositories/userDBRepository");
const subscriptionDBRepository_1 = require("../../../application/repositories/subscriptionDBRepository");
const UserRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/UserRepoMongoDb");
const subscriptionRepoMongDb_1 = require("../../../frameworks/database/mongodb/repositories/subscriptionRepoMongDb");
const paymentRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/paymentRepoMongoDb");
const paymentDBRepository_1 = require("../../../application/repositories/paymentDBRepository");
const paymentRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, paymentController_1.default)(paymentServiceInterface_1.paymentServiceInterface, paymentService_1.paymentService, subscriptionDBRepository_1.subscriptionDbRepository, subscriptionRepoMongDb_1.subscriptionRepositoryMongoDb, paymentDBRepository_1.paymentInterface, paymentRepoMongoDb_1.paymentRepositoryMongoDb, userDBRepository_1.userDbRepository, UserRepoMongoDb_1.userRepositoryMongoDB);
    router.route('/stripe/get-config').get(controller.getConfig);
    router.route('/create-checkout-session').post(controller.createPaymentSession);
    return router;
};
exports.default = paymentRouter;
//# sourceMappingURL=payment.js.map