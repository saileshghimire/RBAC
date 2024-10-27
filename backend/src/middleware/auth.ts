
import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "..";


export const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {

        const token = req.headers['authorization']?.split(' ')[1] as string;
        
        if(!token){
            next(new UnauthorizedException('Unauthorized.', ErrorCodes.UNAUTHORIZED_ACCESS));
        }
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        
        const user = await prisma.user.findFirst({
            where:{
                id:decoded.userId
            }});
            if(user){
                req.userId = user.id;
                req.username = user.username;
                next();
                
            }else{
                next(new UnauthorizedException('Invalid token', ErrorCodes.UNAUTHORIZED_ACCESS))
            }
}