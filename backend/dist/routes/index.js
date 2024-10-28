"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user/user"));
const role_1 = __importDefault(require("./role/role"));
const log_1 = __importDefault(require("./log/log"));
const rootrouter = (0, express_1.Router)();
rootrouter.use('/user', user_1.default);
rootrouter.use('/role', role_1.default);
rootrouter.use('/logs', log_1.default);
exports.default = rootrouter;
