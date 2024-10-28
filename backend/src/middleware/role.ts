import { Request,Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "..";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { permission } from "process";
import { log } from "console";

// export const checkRole = (model: string) =>{
  //     return async (req: Request, res: Response, next: NextFunction) => {
    //         try {
      //             const userId = req.userId; 
      
      //             const method = req.method as keyof typeof methodToAction;
      //             const action = methodToAction[method]
      
      //             const user = await prisma.user.findUnique({
        //                 where: { id: userId },
        //                 include: { role: true }
        //               });
        
        //             if (!user || !user.role) {
          //             return res.status(403).json({ message: 'User or role not found' });
          //             }
          //             const role = user.role;
          //             // const hasPermission = role.permissions.includes(action);
          
          //             // const hasPermission = role.permissions[model]?.includes(action) || false;
          
          //             // if (!hasPermission) {
            //             //     return res
            //             //     .status(403)
            //             //     .json({ message: `You do not have permission to ${action} on ${model}` });
            //             // }

//             next();
//         } catch (error) {
  //             console.log(error);         
  //             return res.status(500).json({ message: "Internal server error" });
  //         }
  //       };
  //     };
  
  
  /* 
  extract user id from token , 
  extract role id from user id, 
  search permission_category using roleid ,
  if yes authorixed else not authorized
  */


  export const checkPermission  = (permission:string) =>{
  return async(req:Request, res:Response, next:NextFunction) => {
    const userId = req.userId;
    
    const roleId = await prisma.user.findFirst({
      where:{
        id:+userId
      },
      select:{
        roleID:true
      }
    });

    if(!roleId){
      return next(new UnauthorizedException("Unauthorized Role....", ErrorCodes.UNAUTHORIZED_ACCESS));
    }

    const Permission = await prisma.permissions_category.findFirst({
      where:{
        roleId: +roleId.roleID,
        permission:permission
      }
    });
    
    if(!Permission){
      return next(new UnauthorizedException("Unauthorized Role", ErrorCodes.UNAUTHORIZED_ACCESS));
    }
    next();
  }
};

