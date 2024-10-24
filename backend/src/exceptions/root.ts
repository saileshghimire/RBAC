
export class HttpException extends Error{
    message: string;
    errorCode:any;
    statusCode:number;
    errors:ErrorCodes;

    constructor(message:string,errorCode:ErrorCodes,statusCode:number,errors:any){
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = errors
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    USERNAME_ALREADY_EXISTS = 1003,
    INCORRECT_PASSWORD = 1004,
    Unprocessable_ENTITY= 2001,
    INTERNAL_EXCEPTION=3001,
    UNAUTHORIZED_ACCESS=4001,
    INVALID_OTP=5001,
    PASSWORD_NOT_CREATED=6001,
    ROLE_NOT_FOUND=7001,
}


