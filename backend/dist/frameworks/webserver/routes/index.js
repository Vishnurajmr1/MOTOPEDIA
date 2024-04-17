"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const refresh_1 = __importDefault(require("./refresh"));
const userAuthMiddleware_1 = __importDefault(require("../middlewares/userAuthMiddleware"));
const roleCheckMiddleware_1 = __importDefault(require("../middlewares/roleCheckMiddleware"));
const admin_1 = __importDefault(require("./admin"));
const posts_1 = __importDefault(require("./posts"));
const chat_1 = __importDefault(require("./chat"));
const message_1 = __importDefault(require("./message"));
const payment_1 = __importDefault(require("./payment"));
const subscription_1 = __importDefault(require("./subscription"));
const notification_1 = __importDefault(require("./notification"));
const routes = (app) => {
    app.use('/api/auth', (0, auth_1.default)());
    app.use('/api/all/refresh-token', (0, refresh_1.default)());
    app.use('/api/admin', userAuthMiddleware_1.default, (0, roleCheckMiddleware_1.default)('admin'), (0, admin_1.default)());
    app.use('/api/user', (0, user_1.default)());
    app.use('/api/posts', (0, posts_1.default)());
    app.use('/api/notification', (0, notification_1.default)());
    app.use('/api/chat', (0, chat_1.default)());
    app.use('/api/messages', (0, message_1.default)());
    app.use('/api/subscription', (0, subscription_1.default)());
    app.use('/api/payment', userAuthMiddleware_1.default, (0, payment_1.default)());
};
exports.default = routes;
//# sourceMappingURL=index.js.map