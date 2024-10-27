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
        const body = RoleSchema.parse(req.body);

        const permissions = body.permissions as any
        
        const permissionEntries: { permission: string; roleId?: number }[] = [];
        // for(const modelName in permissions){
        //   // @ts-ignore
        //   const actions = permissions[modelName];
        //   actions.forEach((action: string) => {
        //     permissionEntries.push({
        //       permission: `${action}_${modelName}`,
        //     });
        //   });
        // }
        permissions.forEach((permission: string) => {
          const [action, modelName] = permission.split('_');
          if (action && modelName) {
              permissionEntries.push({
                  permission: `${action}_${modelName}`,
              });
          }
      });

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
        return res.status(201).json({
          message:"Role created successfully"
        });
      
        

    } catch (error) {
        console.log(error);
        res.status(400).json({ message:"Failed to create role"});
    }
};

export const updateRole = async (req: Request, res: Response,next:NextFunction) => {
    const { id } = req.params;

    try {
      const body = req.body;
           
      const permissions = body.permissions as any
        
    const permissionEntries = permissions.map((permission: string) => {
      const [action, modelName] = permission.split('_');
      return { permission: `${action}_${modelName}`, roleId: +id };
  });

  // Update the role
  const updatedRole = await prisma.$transaction(async (prisma) => {
    // Step 1: Update the role's name
    const role = await prisma.role.update({
        where: { id: +id },
        data: { name: body.role },
    });

    // Step 2: Delete existing permissions for this role
    await prisma.permissions_category.deleteMany({
        where: { roleId: +id },
    });

    // Step 3: Create new permissions
    await prisma.permissions_category.createMany({
        data: permissionEntries,
    });

    // Step 4: Fetch the updated role with permissions
    return prisma.role.findUnique({
        where: { id: +id },
        include: { permissions: true },
    });
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
      const roles = await prisma.role.findMany({
        include:{
          permissions:true
        }
      });
  
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

export const getItem = async(req:Request, res:Response) => {
  console.log("getseed item");
  
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
};