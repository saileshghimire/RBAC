"use strict";
// interface LogEntry {
//     level: number;
//     time: number;
//     pid: number;
//     hostname: string;
//     methods: string;
//     url: string;
//     statusCode?: number;
//     responseTime?: string;
//   }
Object.defineProperty(exports, "__esModule", { value: true });
exports.logsFilter = void 0;
//   interface FilteredLogs {
//     [method: string]: LogEntry[];
//   }
const logsFilter = (logs, date, method) => {
    try {
        if (date) {
            const targetDate = new Date(date).setHours(0, 0, 0, 0);
            logs = logs.filter(log => log.time >= targetDate);
        }
        if (method) {
            logs = logs.filter(log => log.methods == method);
            // console.log(logs);
        }
        // console.log(logs);
        return logs;
    }
    catch (error) {
        console.log(error);
        return `failed to filter`;
    }
};
exports.logsFilter = logsFilter;
