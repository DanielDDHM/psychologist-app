import jwt from "jsonwebtoken"
import { DefaultMessages, StatusCode } from "../constants"
import { PasswordGenerator } from "../helpers"
import { Exception } from "../helpers"
import { User } from "../models"

export namespace AuthService {
  export const login = async (payload: any): Promise<{ auth: boolean; token: string }> => {
    try {
      const { email, password } = payload

      const user = await User.findOne({ email: email })

      if (!user) {
        throw new Exception.AppError(StatusCode.NOT_FOUND, [DefaultMessages.Auth.MISSING_TOKEN])
      }

      const passMatch = await PasswordGenerator.compare(password, user?.password!)

      console.log(passMatch)

      if (!passMatch || user?.email !== email) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.Auth.NOT_PERMITED])
      }

      const token = jwt.sign({ email }, String(process.env.AUTH_SECRET), { expiresIn: "1h" })

      return { auth: true, token }
    } catch (error: any) {
      console.log(error)
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [
        DefaultMessages.StatusMessage.INTERNAL_SERVER_ERROR,
      ])
    }
  }

  export const logout = async (): Promise<{ auth: boolean; token: null }> => {
    try {
      return { auth: false, token: null }
    } catch (error: any) {
      console.log(error)
      if (error instanceof Exception.AppError) {
        throw new Exception.AppError(error?.statusCode, error?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [
        DefaultMessages.StatusMessage.INTERNAL_SERVER_ERROR,
      ])
    }
  }
}
