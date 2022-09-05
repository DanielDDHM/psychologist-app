import { Request, Response } from "express"
import { StatusCode } from "../constants"
import { AuthService } from "../services"

export namespace AuthController {
  export const login = async (req: Request, res: Response) => {
    const { body } = req
    try {
      const userLogin = await AuthService.login(body)
      return res.status(StatusCode.OK).send(userLogin)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }

  export const logout = async (req: Request, res: Response) => {
    try {
      const userLogout = await AuthService.logout()

      return res.status(StatusCode.OK).send(userLogout)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }
}
