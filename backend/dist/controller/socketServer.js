"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketServer = void 0;
const http_1 = require("http");
const setupSocketServer = (httpServer) => {
    const io = new http_1.Server(httpServer);
};
exports.setupSocketServer = setupSocketServer;
