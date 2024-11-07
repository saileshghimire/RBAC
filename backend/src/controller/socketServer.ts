import { Server } from "socket.io";
// import { logWatcher } from "./logs/socketLogs";

export const setupSocketServer = (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`Socket ${socket.id} connected.`);
        
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected.`);
        });
    });

};