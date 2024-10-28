import { Router } from "express";
import { errorHandler } from "../../validation/error-handler";
import { getlogs } from "../../controller/logs/logs";

const logRouter:Router = Router();

logRouter.get('/',errorHandler(getlogs));

export default logRouter;