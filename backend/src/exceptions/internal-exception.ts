import { ErrorCodes, HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(message: string, errors:any, errorCode:any){
        super(message, errorCode,500, errors)
    }
}