import { Router } from "express";
import { errorHandler } from "../../validation/error-handler";
import { login, register } from "../../controller/user/user";
import { checkPermission } from "../../middleware/role";


const userRouter:Router = Router();

userRouter.post('/register',[checkPermission("create_user")],errorHandler(register));
userRouter.post('/login',errorHandler(login));


export default userRouter;