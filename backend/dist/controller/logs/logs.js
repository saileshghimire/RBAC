"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlogs = void 0;
const pagination_1 = require("../pagination");
const fs = require('fs');
const path = require('path');
// const filepath = path.join(__dirname, '../logs/backend.log')
const getlogs = (req, res) => {
    fs.readFile(path.join(__dirname, '../../../logs/backend.log'), 'utf-8', (err, logs) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Failed to load logs' });
        }
        // Process logs and send response
        const parsedLogs = logs.split('\n').filter(Boolean).map((line) => JSON.parse(line));
        const currentPage = parseInt(req.query.page) || 1;
        const pageSize = 5;
        const paginatedLogs = yield (0, pagination_1.paginate)(parsedLogs, currentPage, pageSize);
        return res.status(200).json(paginatedLogs);
    }));
};
exports.getlogs = getlogs;