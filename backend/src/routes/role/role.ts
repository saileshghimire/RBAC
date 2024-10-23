import { Router } from "express";
import { createRole,getAllRoles, updateRole,deleteRole, getRolebyID } from "../../controller/role/role";
import { errorHandler } from "../../validation/error-handler";
import { authMiddleware } from "../../middleware/auth";

const roleRouter = Router();

roleRouter.post("/create",[authMiddleware], errorHandler(createRole));
roleRouter.get("/",[authMiddleware], errorHandler(getAllRoles));
roleRouter.get("/:id",[authMiddleware],errorHandler(getRolebyID));
roleRouter.put("/update/:id", [authMiddleware],errorHandler(updateRole));
roleRouter.delete("/delete/:id",[authMiddleware], errorHandler(deleteRole));


export default roleRouter;