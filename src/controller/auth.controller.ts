import { Request, Response } from "express";
import { Messages, StatusCode } from "../constants";
import { Exception } from "../helpers";
import { AuthService } from "../services/auth.service";
export namespace AuthController {
  export const login = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const userLogin = await AuthService.login(body)

      if (!userLogin) {
        Exception.AppError(StatusCode.BAD_REQUEST, Messages.Auth.NOT_PERMITED)
      }

      return Exception.Response(StatusCode.OK, userLogin)
    } catch (error: any) {
      Exception.Response(StatusCode.INTERNAL_SERVER_ERROR, error)
    }
  }

  export const logout = async (req: Request, res: Response) => {
    try {
      const token = req.headers['authorization'];

      const userLogout = await AuthService.logout(token);

      return Exception.Response(StatusCode.OK, userLogout)
    } catch (error: any) {
      Exception.Response(StatusCode.INTERNAL_SERVER_ERROR, error)
    }
  }
}