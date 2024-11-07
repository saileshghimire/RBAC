import { Router } from "express";
import { errorHandler } from "../../validation/error-handler";
import { getlogs } from "../../controller/logs/logs";
import { authMiddleware } from "../../middleware/auth";
import { checkPermission } from "../../middleware/role";

const logRouter:Router = Router();

logRouter.get('/',[authMiddleware,checkPermission("read_log")],errorHandler(getlogs));

export default logRouter;