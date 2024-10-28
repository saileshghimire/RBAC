"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
exports.logger = (0, pino_1.default)({
    transport: {
        target: 'pino/file',
        options: { destination: './logs/backend.log', mkdir: true },
    },
    level: 'info',
    formatters: {
        log: ({ methods, url, statusCode, responseTime }) => {
            return { methods, url, statusCode, responseTime };
        },
    },
});
const loggerMiddleware = (req, res, next) => {
    // Start time for response time calculation
    const start = Date.now();
    // Log request details
    exports.logger.info({ methods: req.method, url: req.url });
    // On response finish, calculate and log response details
    res.on('finish', () => {
        const responseTime = Date.now() - start;
        exports.logger.info({
            methods: req.method,
            url: req.url,
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
        });
    });
    next();
};
exports.loggerMiddleware = loggerMiddleware;
//  using morgan...
