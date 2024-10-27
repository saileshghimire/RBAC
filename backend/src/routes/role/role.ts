import { Router } from "express";
import { createRole,getAllRoles, updateRole,deleteRole, getRolebyID, getItem } from "../../controller/role/role";
import { errorHandler } from "../../validation/error-handler";
import { authMiddleware } from "../../middleware/auth";
import { checkPermission } from "../../middleware/role";

const roleRouter = Router();

roleRouter.get("/seeditem",[authMiddleware,],getItem)
roleRouter.post("/create",[authMiddleware,checkPermission("create_role")], errorHandler(createRole));
roleRouter.get("/",[authMiddleware,checkPermission("read_role")], errorHandler(getAllRoles));
roleRouter.get("/:id",[authMiddleware,checkPermission("read_role")],errorHandler(getRolebyID));
roleRouter.put("/update/:id", [authMiddleware,checkPermission("update_role")],errorHandler(updateRole));
roleRouter.delete("/delete/:id",[authMiddleware,checkPermission("delete_role")], errorHandler(deleteRole));


export default roleRouter;