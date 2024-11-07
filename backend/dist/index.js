"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const secrets_1 = require("./secrets");
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const error_1 = require("./middleware/error");
const routes_1 = __importDefault(require("./routes"));
const logger_1 = require("./logger");
const socketServer_1 = require("./controller/socketServer");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", // exact origin
        credentials: true
    }
});
(0, logger_1.setLoggerSocket)(io);
app.use(logger_1.loggerMiddleware);
app.use((0, morgan_1.default)('tiny'));
app.disable('x-powered-by');
app.use('/api', routes_1.default);
exports.prisma = new client_1.PrismaClient();
app.get('/', (req, res) => {
    res.json("Hello ..");
});
app.use(error_1.errorMiddleware);
(0, socketServer_1.setupSocketServer)(io);
httpServer.listen(secrets_1.PORT, () => {
    console.log(`Server is running on port http://localhost:${secrets_1.PORT}`);
});
