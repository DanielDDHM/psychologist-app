import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../constants/statuscode.typings";
import AppError from "../helpers/apperror.exception";

export namespace AuthMiddleware {

  export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('UNDER MAINTENANCE')
      next();
    } catch (e: any) {
      throw new AppError('', StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('UNDER MAINTENANCE')
      next();
    } catch (e: any) {
      throw new AppError('', StatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}