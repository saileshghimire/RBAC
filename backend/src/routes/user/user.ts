import { Router } from "express";
import { errorHandler } from "../../validation/error-handler";
import { login, register } from "../../controller/user/user";


const userRouter:Router = Router();

userRouter.post('/register',errorHandler(register));
userRouter.post('/login',errorHandler(login));


export default userRouter;