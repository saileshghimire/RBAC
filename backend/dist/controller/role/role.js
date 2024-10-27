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
exports.getItem = exports.deleteRole = exports.getRolebyID = exports.getAllRoles = exports.updateRole = exports.createRole = void 0;
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
        const body = role_1.RoleSchema.parse(req.body);
        const permissions = body.permissions;
        const permissionEntries = [];
        // for(const modelName in permissions){
        //   // @ts-ignore
        //   const actions = permissions[modelName];
        //   actions.forEach((action: string) => {
        //     permissionEntries.push({
        //       permission: `${action}_${modelName}`,
        //     });
        //   });
        // }
        permissions.forEach((permission) => {
            const [action, modelName] = permission.split('_');
            if (action && modelName) {
                permissionEntries.push({
                    permission: `${action}_${modelName}`,
                });
            }
        });
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
        return res.status(201).json({
            message: "Role created successfully"
        });
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
        const body = req.body;
        const permissions = body.permissions;
        const permissionEntries = permissions.map((permission) => {
            const [action, modelName] = permission.split('_');
            return { permission: `${action}_${modelName}`, roleId: +id };
        });
        // Update the role
        const updatedRole = yield __1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Step 1: Update the role's name
            const role = yield prisma.role.update({
                where: { id: +id },
                data: { name: body.role },
            });
            // Step 2: Delete existing permissions for this role
            yield prisma.permissions_category.deleteMany({
                where: { roleId: +id },
            });
            // Step 3: Create new permissions
            yield prisma.permissions_category.createMany({
                data: permissionEntries,
            });
            // Step 4: Fetch the updated role with permissions
            return prisma.role.findUnique({
                where: { id: +id },
                include: { permissions: true },
            });
        }));
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
        const roles = yield __1.prisma.role.findMany({
            include: {
                permissions: true
            }
        });
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
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getseed item");
    try {
        const items = yield __1.prisma.item.findMany();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching items' });
    }
});
exports.getItem = getItem;
