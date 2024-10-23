import { NextFunction, Request, Response} from 'express'
import { ErrorCodes, HttpException } from '../exceptions/root'
import { InternalException } from '../exceptions/internal-exception'
import { ZodError } from 'zod'
import { BadRequestsException } from '../exceptions/bad-request'

export const errorHandler = (method:Function) =>{
    return async (req:Request, res:Response, next: NextFunction) =>{
        try{
            await method(req,res,next)
        } catch(error:any){
            console.log(error);
            
            let exception: HttpException;
            if(error instanceof HttpException){
                exception = error;
            } else {
                if(error instanceof ZodError){
                    // exception = new BadRequestsException(`${error.issues[0].message}`,ErrorCodes.Unprocessable_ENTITY)
                    exception = new BadRequestsException(`Unprocessable Entity`,ErrorCodes.Unprocessable_ENTITY)
                } else{
                    exception = new InternalException('Something went wrong!',error,ErrorCodes.INTERNAL_EXCEPTION)
                    
                }
            }
            next(exception);
        }
    }
}