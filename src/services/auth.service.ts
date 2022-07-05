import { Messages, StatusCode } from "../constants"
import { Password } from "../helpers"
import { Exception } from "../helpers/apperror.exception"
import { User } from "../models"
import jwt from 'jsonwebtoken'

export namespace AuthService {
  export const login = async (payload: any) => {
    const { email, password } = payload

    const user = await User.findOne({ email })
    if (!user) Exception.AppError(StatusCode.NOT_FOUND, Messages.AuthMessages.MISSING_TOKEN);

    const passMatch = await Password.compare(password, user?.password!)

    if (!passMatch || user?.email !== email) {
      Exception.AppError(StatusCode.BAD_REQUEST, Messages.AuthMessages.NOT_PERMITED)
    }

    const token = jwt.sign(email, String(process.env.AUTH_SECRET), { expiresIn: '1h' })

    return { auth: true, token };
  }

  export const logout = async (token: any) => {
    try {
      console.log(token)
      return { auth: false, token: null };
    } catch (error: any) {
      Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, Messages.DefaultMessages.INTERNAL_SERVER_ERROR)
    }
  }
}