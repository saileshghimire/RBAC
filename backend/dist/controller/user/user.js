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
exports.logout = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("../..");
const secrets_1 = require("../../secrets");
const not_found_1 = require("../../exceptions/not-found");
const root_1 = require("../../exceptions/root");
const bad_request_1 = require("../../exceptions/bad-request");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield __1.prisma.user.findUnique({
        where: { username },
    });
    if (!user) {
        return next(new not_found_1.NotFoundException("User not Found", root_1.ErrorCodes.USER_NOT_FOUND));
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return next(new bad_request_1.BadRequestsException("Invalid credentials.", root_1.ErrorCodes.INCORRECT_PASSWORD));
        // Add return here to stop further execution
    }
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secrets_1.JWT_SECRET);
    // Send success response
    return res.status(200).json({
        message: 'SignIn successful',
        token: `Bearer ${token}`,
        user: {
            id: user.id,
            username: user.username,
        },
    });
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, middlename, firstname, lastname, phonenumber, address, dateofbirth, roleId } = req.body;
    try {
        const existingUser = yield __1.prisma.user.findFirst({
            where: {
                username
            }
        });
        if (existingUser) {
            return next(new bad_request_1.BadRequestsException("Username already exist", root_1.ErrorCodes.USERNAME_ALREADY_EXISTS));
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield __1.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                firstname,
                middlename,
                lastname,
                address,
                phonenumber,
                dateofbirth: new Date(dateofbirth),
                roleID: +roleId
            },
        });
        return res.status(200).json({
            message: 'User created successfully',
            user: newUser
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    try {
        yield __1.prisma.token.create({
            data: {
                token
            }
        });
        return res.status(200).json({
            message: " Successfully Logout"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Problem in logging out"
        });
    }
});
exports.logout = logout;
