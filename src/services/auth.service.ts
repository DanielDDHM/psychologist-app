import jwt from 'jsonwebtoken'
import { Messages, StatusCode } from '../constants'
import { PasswordGenerator } from '../helpers'
import { Exception } from '../helpers'
import { User } from '../models'

export namespace AuthService {
  export const login = async (payload: any): Promise<{ auth: boolean; token: string }> => {
    const { email, password } = payload

    const user = await User.findOne({ email })
    if (!user) throw new Exception.AppError(StatusCode.NOT_FOUND, [Messages.Auth.MISSING_TOKEN])

    const passMatch = await PasswordGenerator.compare(password, user?.password!)

    if (!passMatch || user?.email !== email) {
      throw new Exception.AppError(StatusCode.BAD_REQUEST, [Messages.Auth.NOT_PERMITED])
    }

    const token = jwt.sign(email, String(process.env.AUTH_SECRET), { expiresIn: '1h' })

    return { auth: true, token }
  }

  export const logout = async (): Promise<{ auth: boolean; token: null }> => {
    try {
      return { auth: false, token: null }
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [
        Messages.StatusMessage.INTERNAL_SERVER_ERROR,
      ])
    }
  }
}
