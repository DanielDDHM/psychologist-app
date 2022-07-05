import bcrypt from 'bcryptjs'
import { Messages, StatusCode } from '../constants'
import { Exception } from './exception'
export namespace Password {
  export const crypt = async (pass: string, salt: string) => {
    try {
      const encryptPass = await bcrypt.hash(pass, salt)

      if (!encryptPass) {
        Exception.AppError(StatusCode.FAILED_DEPENDENCY, Messages.Auth.CRYPT_PASS_FAIL)
      }

      return encryptPass
    } catch (error) {
      Exception.Response(StatusCode.FAILED_DEPENDENCY, Messages.Auth.CRYPT_PASS_FAIL)
    }
  }

  export const compare = async (pass: string, userPass: string) => {
    try {
      const comparePass = await bcrypt.compare(pass, userPass)

      if (!comparePass) {
        Exception.AppError(StatusCode.BAD_REQUEST, Messages.Auth.CRYPT_PASS_FAIL)
      }

      return comparePass
    } catch (error: any) {
      Exception.Response(StatusCode.INTERNAL_SERVER_ERROR, error.message)
    }
  }
}