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
exports.checkPermission = void 0;
const __1 = require("..");
const unauthorized_1 = require("../exceptions/unauthorized");
const root_1 = require("../exceptions/root");
/*
extract user id from token ,
extract role id from user id,
search permission_category using roleid ,
if yes authorixed else not authorized
*/
const checkPermission = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.userId;
        const roleId = yield __1.prisma.user.findFirst({
            where: {
                id: +userId
            },
            select: {
                roleID: true
            }
        });
        if (!roleId) {
            return next(new unauthorized_1.UnauthorizedException("Unauthorized Role....", root_1.ErrorCodes.UNAUTHORIZED_ACCESS));
        }
        const Permission = yield __1.prisma.permissions_category.findFirst({
            where: {
                roleId: +roleId.roleID,
                permission: permission
            }
        });
        if (!Permission) {
            return next(new unauthorized_1.UnauthorizedException("Unauthorized Role", root_1.ErrorCodes.UNAUTHORIZED_ACCESS));
        }
        next();
    });
};
exports.checkPermission = checkPermission;
