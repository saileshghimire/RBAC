"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = void 0;
const zod_1 = require("zod");
exports.RoleSchema = zod_1.z.object({
    role: zod_1.z.string(),
    permissions: zod_1.z.array(zod_1.z.string()).optional(),
    // userId: z.number()
});
