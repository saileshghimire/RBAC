"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.setLoggerSocket = exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("./secrets");
let io = null;
exports.logger = (0, pino_1.default)({
    transport: {
        target: 'pino/file',
        options: { destination: './logs/backend.log', mkdir: true },
    },
    level: 'info',
    formatters: {
        log: ({ methods, url, statusCode, responseTime, username }) => {
            return { methods, url, statusCode, responseTime, username };
        },
    },
});
// Function to initialize Socket.IO in the logger module
const setLoggerSocket = (socketServer) => {
    io = socketServer;
};
exports.setLoggerSocket = setLoggerSocket;
const loggerMiddleware = (req, res, next) => {
    // Start time for response time calculation
    const start = Date.now();
    let username = '';
    if (req.url === "/api/user/login" && req.body.username) {
        username = req.body.username; // Use username from request body during login
    }
    else if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1];
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
                username = decoded.username; // Use username from token
            }
            catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }
    // // Log request details
    // logger.info({ methods: req.method, url: req.url, username });
    // // On response finish, calculate and log response details
    // res.on('finish', () => {
    //   const responseTime = Date.now() - start;
    //   const log = {
    //     methods: req.method,
    //     url: req.url,
    //     statusCode: res.statusCode,
    //     responseTime: `${responseTime}ms`,
    //     username
    //   };
    //   logger.info(log);
    //   if (io) {
    //     io.emit('new_log', log);
    // }
    // });
    // Initial log of request details
    const requestLog = {
        methods: req.method,
        url: req.url,
        username,
        timestamp: new Date().toISOString(),
    };
    exports.logger.info(requestLog);
    // Emit the initial request log to the frontend if connected
    if (io) {
        io.emit('new_log', requestLog);
    }
    // On response finish, calculate and log response details
    res.on('finish', () => {
        const responseTime = Date.now() - start;
        // Log response details, appending to the initial request log
        const responseLog = Object.assign(Object.assign({}, requestLog), { statusCode: res.statusCode, responseTime: `${responseTime}ms` });
        exports.logger.info(responseLog);
        // Emit the response log to the frontend if connected
        if (io) {
            io.emit('new_log', responseLog);
        }
    });
    next();
};
exports.loggerMiddleware = loggerMiddleware;
