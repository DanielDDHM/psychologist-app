import jwt from 'jsonwebtoken'
import { Messages, StatusCode } from "../constants"
import { Password } from "../helpers"
import { Exception } from "../helpers"
import { User } from "../models"

export namespace AuthService {
  export const login = async (payload: any) => {
    const { email, password } = payload

    const user = await User.findOne({ email })
    if (!user) Exception.Response(StatusCode.NOT_FOUND, Messages.Auth.MISSING_TOKEN);

    const passMatch = await Password.compare(password, user?.password!)

    if (!passMatch || user?.email !== email) {
      Exception.Response(StatusCode.BAD_REQUEST, Messages.Auth.NOT_PERMITED)
    }

    const token = jwt.sign(email, String(process.env.AUTH_SECRET), { expiresIn: '1h' })

    return { auth: true, token };
  }

  export const logout = async (token: any) => {
    try {
      console.log(token)
      return { auth: false, token: null };
    } catch (error: any) {
      Exception.Response(StatusCode.INTERNAL_SERVER_ERROR, Messages.StatusMessage.INTERNAL_SERVER_ERROR)
    }
  }
}