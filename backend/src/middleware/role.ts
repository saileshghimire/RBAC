import { Request,Response, NextFunction } from "express";
import { prisma } from "..";


export const checkRole = (model: string) =>{
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId; 
  
            const method = req.method as keyof typeof methodToAction;
            const action = methodToAction[method]

            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: { role: true }
              });

            if (!user || !user.role) {
            return res.status(403).json({ message: 'User or role not found' });
            }
            const role = user.role;
            // const hasPermission = role.permissions.includes(action);
            
            // const hasPermission = role.permissions[model]?.includes(action) || false;

            // if (!hasPermission) {
            //     return res
            //     .status(403)
            //     .json({ message: `You do not have permission to ${action} on ${model}` });
            // }

            next();
        } catch (error) {
            console.log(error);         
            return res.status(500).json({ message: "Internal server error" });
        }
      };
    };




