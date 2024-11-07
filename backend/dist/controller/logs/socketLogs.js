"use strict";
// import { Socket } from "socket.io";
// import fs from 'fs';
// import path from 'path';
// import { paginate } from "../pagination";
// export const getlog = async () => {
//     const logPath = path.join(__dirname, '../../../logs/backend.log');
//     // Use a promise wrapper around `fs.readFile` to allow async/await
//     return new Promise((resolve, reject) => {
//         fs.readFile(logPath, 'utf-8', async (err: NodeJS.ErrnoException | null, logs: string) => {
//             if (err) {
//                 console.log(err);
//                 reject({ error: 'Failed to load logs' });
//                 return;
//             }
//             try {
//                 // Process logs
//                 const parsedLogs = logs.split('\n').filter(Boolean).map((line) => JSON.parse(line));
//                 const currentPage = 1;
//                 const paginatedLogs = await paginate(parsedLogs, currentPage);
//                 resolve(paginatedLogs);
//             } catch (error) {
//                 console.log("Error parsing logs:", error);
//                 reject({ error: 'Failed to parse logs' });
//             }
//         });
//     });
// };
// export const logWatcher = (socket:Socket) =>{
//     const logpath = path.join(__dirname, '../../../logs/backend.log');
//     fs.watch(logpath, async(eventType)=>{
//         if(eventType === 'change'){
//             try {
//                 console.log("hello..");
//                 const logs = await getlog();
//                 console.log("hi..");
//                 socket.emit("new_log",logs);
//                 console.log("....");
//             } catch (error) {
//                 console.log(error);        
//             }
//         }
//     });
//     socket.on("connection",(logs)=>{
//         console.log("socket on");
//         socket.emit("new_log",logs);
//     });
//     socket.on("disconnect",()=>{
//         console.log("client disconnected from live log updates");
//     });
// };
