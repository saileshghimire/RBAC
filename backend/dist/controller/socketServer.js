"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketServer = void 0;
// import { logWatcher } from "./logs/socketLogs";
const setupSocketServer = (io) => {
    io.on("connection", (socket) => {
        console.log(`Socket ${socket.id} connected.`);
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected.`);
        });
    });
};
exports.setupSocketServer = setupSocketServer;
