import { Server } from "http";



export const setupSocketServer = (httpServer:any) => {
    const io = new Server(httpServer);

};