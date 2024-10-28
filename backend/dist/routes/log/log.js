"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../../validation/error-handler");
const logs_1 = require("../../controller/logs/logs");
const logRouter = (0, express_1.Router)();
logRouter.get('/', (0, error_handler_1.errorHandler)(logs_1.getlogs));
exports.default = logRouter;
