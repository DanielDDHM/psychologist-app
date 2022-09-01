import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../constants"
import { Exception } from "../helpers"

export namespace AuthMiddleware {
  export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("UNDER MAINTENANCE")
      next()
    } catch (e: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, e)
    }
  }

  export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("UNDER MAINTENANCE")
      next()
    } catch (e: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, e)
    }
  }
}
