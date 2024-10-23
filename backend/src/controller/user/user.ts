
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../..';
import { JWT_SECRET } from '../../secrets';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        // include: { role: true },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  

      const isPasswordValid = await bcrypt.compare(password, user.password); // Make sure you have a password field
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  

      const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET as string, 
        { expiresIn: '1h' } 
      );
  

      res.status(200).json({
        message: 'SignIn successful',
        token,
        user: {
          id: user.id,
          username: user.username,
        //   role: user.rolename.name,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  export const register = async (req: Request, res: Response) => {
      const { username, password,middlename, firstname, lastname, phonenumber,address, dateofbirth, roleName, permissions=[] } = req.body;
      
      const initialPermission = ["read_project", "create_project", "read_task", "create_task"];
      const permissionList = permissions.length > 0 ? permissions : initialPermission;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const permissionEntries = permissionList.map((perm: string) => ({
        permission: perm
      }));

      const newRole = await prisma.role.create({
        data: {
          name: roleName,
          users: {
            create: {
              username,
              password: hashedPassword,
              firstname,
              middlename,
              lastname,
              address,
              phonenumber,
              dateofbirth: new Date(dateofbirth),
            }
          },
          permissions: {
            create: permissionEntries
          }
        }
      });
  
      return res.status(201).json({
        message: 'User created successfully',
        user: {
        //   id: newRole.users[0].id,
          username: username,
          role: roleName,
          permissions: permissionList
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };