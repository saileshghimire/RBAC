
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../..';
import { JWT_SECRET } from '../../secrets';
import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCodes } from '../../exceptions/root';
import { BadRequestsException } from '../../exceptions/bad-request';



export const login = async (req: Request, res: Response,next:NextFunction) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return next(new NotFoundException("User not Found", ErrorCodes.USER_NOT_FOUND));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new BadRequestsException("Invalid credentials.", ErrorCodes.INCORRECT_PASSWORD));
      // Add return here to stop further execution
    }


    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET as string,
      // { expiresIn: '1h' }
    );

    // Send success response
    return res.status(200).json({
      message: 'SignIn successful',
      token: `Bearer ${token}`,
      user: {
        id: user.id,
        username: user.username,
      },
    });


  };

  
  export const register = async (req: Request, res: Response, next:NextFunction) => {
      const { username, password,middlename, firstname, lastname, phonenumber,address, dateofbirth, roleId } = req.body;
      
    try {
      const existingUser = await prisma.user.findFirst({
        where:{
          username
        }
      });
      if(existingUser){
        return next(new BadRequestsException("Username already exist", ErrorCodes.USERNAME_ALREADY_EXISTS))
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          
              username,
              password: hashedPassword,
              firstname,
              middlename,
              lastname,
              address,
              phonenumber,
              dateofbirth: new Date(dateofbirth),
              roleID: +roleId
            },
          
      });
  
      return res.status(200).json({
        message: 'User created successfully',
        user: newUser
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };



  export const logout = async(req:Request, res:Response,next:NextFunction) => {
    const token  = req.headers['authorization']?.split(' ')[1] as string;
    try {
      await prisma.token.create({
        data:{
          token
        }
      });
      return res.status(200).json({
        message:" Successfully Logout"
      })
    } catch (error) {
      return res.status(500).json({
        message:"Problem in logging out"
      })
    }

  }