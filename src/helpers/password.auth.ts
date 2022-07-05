import bcrypt from 'bcryptjs'
import { Messages, StatusCode } from '../constants'
import { Exception } from './apperror.exception'
export namespace Password {
  export const crypt = async (pass: string, salt: string) => {
    try {
      const encryptPass = await bcrypt.hash(pass, salt)
      return encryptPass
    } catch (error) {
      throw Exception.AppError(StatusCode.FAILED_DEPENDENCY, Messages.AuthMessages.CRYPT_PASS_FAIL)
    }
  }

  export const compare = async (pass: string, userPass: string) => {
    try {
      const comparePass = await bcrypt.compare(pass, userPass)
      return comparePass
    } catch (error: any) {
      throw Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, error.message)
    }
  }
}