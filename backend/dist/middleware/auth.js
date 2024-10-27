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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const root_1 = require("../exceptions/root");
const unauthorized_1 = require("../exceptions/unauthorized");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const __1 = require("..");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(token);
    if (!token) {
        next(new unauthorized_1.UnauthorizedException('Unauthorized.', root_1.ErrorCodes.UNAUTHORIZED_ACCESS));
    }
    const decoded = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
    const user = yield __1.prisma.user.findFirst({
        where: {
            id: decoded.userId
        }
    });
    if (user) {
        req.userId = user.id;
        req.username = user.username;
        next();
    }
    else {
        next(new unauthorized_1.UnauthorizedException('Invalid token', root_1.ErrorCodes.UNAUTHORIZED_ACCESS));
    }
});
exports.authMiddleware = authMiddleware;
