"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../../validation/error-handler");
const user_1 = require("../../controller/user/user");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', (0, error_handler_1.errorHandler)(user_1.register));
userRouter.post('/login', (0, error_handler_1.errorHandler)(user_1.login));
exports.default = userRouter;
