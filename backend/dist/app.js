"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongodb/connection"));
const colors_ts_1 = __importDefault(require("colors.ts"));
const appError_1 = __importDefault(require("./utils/appError"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const errorHandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandlingMiddleware"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const http_1 = require("http");
const socket_1 = require("./frameworks/websocket/socket");
colors_ts_1.default === null || colors_ts_1.default === void 0 ? void 0 : colors_ts_1.default.enable();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
(0, connection_1.default)();
(0, express_2.default)(app);
(0, socket_1.setupSocketIO)(app, server);
(0, routes_1.default)(app);
//error handling middleware
app.use(errorHandlingMiddleware_1.default);
//* catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found', 404));
});
(0, server_1.default)(server).startServer();
exports.default = server;
//# sourceMappingURL=app.js.map