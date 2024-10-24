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
exports.register = exports.login = void 0;
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
        // include: { role: true },
    });
    if (!user) {
        // return res.status(404).json({ message: 'User not found' });
        return next(new not_found_1.NotFoundException("User not Found", root_1.ErrorCodes.USER_NOT_FOUND));
    }
    else {
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            // return res.status(401).json({ message: 'Invalid credentials' });
            next(new bad_request_1.BadRequestsException("Invalid credentials.", root_1.ErrorCodes.INCORRECT_PASSWORD));
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secrets_1.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'SignIn successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                //   role: user.rolename.name,
            },
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, middlename, firstname, lastname, phonenumber, address, dateofbirth, roleName, permissions = [] } = req.body;
    const initialPermission = ["read_project", "create_project", "read_task", "create_task"];
    const permissionList = permissions.length > 0 ? permissions : initialPermission;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const permissionEntries = permissionList.map((perm) => ({
            permission: perm
        }));
        const newRole = yield __1.prisma.role.create({
            data: {
                name: roleName,
                users: {
                    create: {
                        username,
                        password: hashedPassword,
                        firstname,
                        middlename,
                        lastname,
                        address,
                        phonenumber,
                        dateofbirth: new Date(dateofbirth),
                    }
                },
                permissions: {
                    create: permissionEntries
                }
            }
        });
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                //   id: newRole.users[0].id,
                username: username,
                role: roleName,
                permissions: permissionList
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
