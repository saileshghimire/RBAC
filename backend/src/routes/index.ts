import { Router, Request, Response } from "express";
import userRouter from "./user/user";
import roleRouter from "./role/role";

const rootrouter:Router = Router()

rootrouter.use('/user',userRouter);
rootrouter.use('/role',roleRouter);

export default rootrouter;