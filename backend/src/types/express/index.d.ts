export {}

declare global {
  namespace Express {
    export interface Request {
      userId?: Int
      username?: String
      roleId?:Int
      // extra variables you want to use in req object
    }
  }

}