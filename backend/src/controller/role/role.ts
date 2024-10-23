import { NextFunction, Request,Response } from "express";
import { prisma } from "../..";
import { RoleSchema } from "../../validation/role";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCodes } from "../../exceptions/root";

/* 
{
  role:"admin"
  permissions:{
  user:["get","put","post","delete"],
  product:["get","post","delete"],
  item:["get","post"],
  }
}

*/

export const createRole = async(req:Request, res:Response) =>{
    try {
        // const body = RoleSchema.parse(req.body);
        const body = req.body

        const permissions = body.permissions
        
        const permissionEntries: { permission: string; roleId?: number }[] = [];
        for(const modelName in permissions){
          // @ts-ignore
          const actions = permissions[modelName];
          actions.forEach((action: string) => {
            permissionEntries.push({
              permission: `${action}_${modelName}`,
            });
          });
        }
        const role = await prisma.role.create({
            data: {
            name: body.role,
            permissions:{
              create: permissionEntries
            }
            },
            include:{
              permissions:true
            }
        });
        return res.status(201).json(role);
      
        

    } catch (error) {
        console.log(error);
        res.status(400).json({ message:"Failed to create role"});
    }
};

export const updateRole = async (req: Request, res: Response,next:NextFunction) => {
    const { id } = req.params;

    try {
      const body = RoleSchema.parse(req.body);
           
      const user = await prisma.user.findFirst({
        where:{
          id:body.userId
        },
        select:{
          roleID:true
        }
      });
      if(!user){
        return next(new NotFoundException("User not Found", ErrorCodes.USER_NOT_FOUND));
      }
 
      const searchRole = await prisma.role.findFirst({
        where:{
          name:body.role
        },
        select:{
          id:true
        }
      });

      if (!searchRole) {
        return next(new NotFoundException("Role not found", ErrorCodes.ROLE_NOT_FOUND));
      }

      const updatedRole = await prisma.user.update({
        where: { id: body.userId },
        data: {
          roleID: searchRole.id
      }
    });
  
      res.status(200).json({
        message:"Role Updated successfully",
        user:updatedRole
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Failed to update role" });
    }
};

export const getAllRoles = async (req: Request, res: Response) => {
    try {
      const roles = await prisma.role.findMany();
  
      res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
};

export const getRolebyID = async(req:Request, res:Response, next:NextFunction) =>{
  const { id } = req.params;
  const role = await prisma.role.findFirst({
    where:{
      id:+id
    },
    select:{
      name:true,
      permissions: {
        select:{
          permission:true
        }
      }
    }
  });
  if(!role){
    return next(new NotFoundException("Role doesnot exit", ErrorCodes.ROLE_NOT_FOUND))
  }
  return res.status(200).json({
    role
  })
}

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
    await prisma.role.delete({
        where: {
        id: parseInt(id),
        },
    });

    res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete role" });
    }
};

