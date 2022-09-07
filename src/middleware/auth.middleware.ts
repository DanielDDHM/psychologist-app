import { NextFunction, Request, Response } from "express"
import { DefaultMessages, StatusCode } from "../constants"
import jwt from "jsonwebtoken"
import { Exception } from "../helpers"
import { User } from "../models"
import { DefaultTypes } from "../types"

export namespace AuthMiddleware {
  export interface CheckTokenResponse {
    email: string
    iat: number
    exp: number
  }

  export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = String(req.headers["x-access-token"])

      if (!token)
        throw new Exception.AppError(StatusCode.UNAUTHORIZED, [DefaultMessages.Auth.NOT_PERMITED])

      const verify = jwt.verify(token, String(process.env.AUTH_SECRET)) as CheckTokenResponse

      if (verify) {
        req.nick = verify?.email
        return next()
      }
    } catch (error: any) {
      res.status(error.statusCode).send(error)
    }
  }

  export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nick = req.nick

      const user = await User.find({ email: nick })

      if (user[0].isActive === true) {
        req.role = user[0].role
      } else {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.Auth.NOT_PERMITED])
      }

      next()
    } catch (e: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, e)
    }
  }

  export const checkAuth = (role: string) => {
    const { USER, ADMIN } = DefaultTypes.UserTypes

    if (role) {
      const verify = (req: Request, res: Response, next: NextFunction) => {
        if (req.role === ADMIN) {
          next()
        } else if (role === USER && req.role === USER) {
          next()
        } else {
          throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.Auth.NOT_PERMITED])
        }
      }

      return verify
    } else {
      throw new Exception.AppError(StatusCode.NOT_FOUND, [
        DefaultMessages.StatusMessage.MISSING_PARAMS,
      ])
    }
  }
}
