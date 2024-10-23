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
exports.deleteRole = exports.getRolebyID = exports.getAllRoles = exports.updateRole = exports.createRole = void 0;
const __1 = require("../..");
const role_1 = require("../../validation/role");
const not_found_1 = require("../../exceptions/not-found");
const root_1 = require("../../exceptions/root");
/*
{
  role:"admin"
  permissions:{
  user:["get","put","post","delete"],
  product:["get","post","delete"],
  item:["get","post"],
  }
}

*/
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const body = RoleSchema.parse(req.body);
        const body = req.body;
        const permissions = body.permissions;
        const permissionEntries = [];
        for (const modelName in permissions) {
            // @ts-ignore
            const actions = permissions[modelName];
            actions.forEach((action) => {
                permissionEntries.push({
                    permission: `${action}_${modelName}`,
                });
            });
        }
        const role = yield __1.prisma.role.create({
            data: {
                name: body.role,
                permissions: {
                    create: permissionEntries
                }
            },
            include: {
                permissions: true
            }
        });
        return res.status(201).json(role);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to create role" });
    }
});
exports.createRole = createRole;
const updateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const body = role_1.RoleSchema.parse(req.body);
        const user = yield __1.prisma.user.findFirst({
            where: {
                id: body.userId
            },
            select: {
                roleID: true
            }
        });
        if (!user) {
            return next(new not_found_1.NotFoundException("User not Found", root_1.ErrorCodes.USER_NOT_FOUND));
        }
        const searchRole = yield __1.prisma.role.findFirst({
            where: {
                name: body.role
            },
            select: {
                id: true
            }
        });
        if (!searchRole) {
            return next(new not_found_1.NotFoundException("Role not found", root_1.ErrorCodes.ROLE_NOT_FOUND));
        }
        const updatedRole = yield __1.prisma.user.update({
            where: { id: body.userId },
            data: {
                roleID: searchRole.id
            }
        });
        res.status(200).json({
            message: "Role Updated successfully",
            user: updatedRole
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to update role" });
    }
});
exports.updateRole = updateRole;
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield __1.prisma.role.findMany();
        res.status(200).json(roles);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllRoles = getAllRoles;
const getRolebyID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const role = yield __1.prisma.role.findFirst({
        where: {
            id: +id
        },
        select: {
            name: true,
            permissions: {
                select: {
                    permission: true
                }
            }
        }
    });
    if (!role) {
        return next(new not_found_1.NotFoundException("Role doesnot exit", root_1.ErrorCodes.ROLE_NOT_FOUND));
    }
    return res.status(200).json({
        role
    });
});
exports.getRolebyID = getRolebyID;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield __1.prisma.role.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({ message: "Role deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete role" });
    }
});
exports.deleteRole = deleteRole;
