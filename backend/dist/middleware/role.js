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
exports.checkRole = void 0;
const __1 = require("..");
const checkRole = (model) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            const method = req.method;
            const action = methodToAction[method];
            const user = yield __1.prisma.user.findUnique({
                where: { id: userId },
                include: { role: true }
            });
            if (!user || !user.role) {
                return res.status(403).json({ message: 'User or role not found' });
            }
            const role = user.role;
            // const hasPermission = role.permissions.includes(action);
            // const hasPermission = role.permissions[model]?.includes(action) || false;
            // if (!hasPermission) {
            //     return res
            //     .status(403)
            //     .json({ message: `You do not have permission to ${action} on ${model}` });
            // }
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.checkRole = checkRole;
