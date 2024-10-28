import { Router, Request, Response } from "express";
import userRouter from "./user/user";
import roleRouter from "./role/role";
import logRouter from "./log/log";

const rootrouter:Router = Router()

rootrouter.use('/user',userRouter);
rootrouter.use('/role',roleRouter);
rootrouter.use('/logs', logRouter);

export default rootrouter;