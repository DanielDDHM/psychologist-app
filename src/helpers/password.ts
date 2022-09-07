import bcrypt from "bcryptjs"
import { DefaultMessages, StatusCode } from "../constants"
import { Exception } from "./exception"
export namespace PasswordGenerator {
  export const crypt = async (pass: string, salt: number) => {
    try {
      const encryptPass = await bcrypt.hash(pass, salt)

      if (!encryptPass) {
        throw new Exception.AppError(StatusCode.FAILED_DEPENDENCY, [
          DefaultMessages.Auth.CRYPT_PASS_FAIL,
        ])
      }

      return encryptPass
    } catch (error) {
      throw new Exception.AppError(StatusCode.FAILED_DEPENDENCY, [
        DefaultMessages.Auth.CRYPT_PASS_FAIL,
      ])
    }
  }

  export const compare = async (pass: string, userPass: string) => {
    try {
      const comparePass = await bcrypt.compare(pass, userPass)

      if (!comparePass) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.Auth.CRYPT_PASS_FAIL])
      }

      return comparePass
    } catch (error: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, error.message)
    }
  }
}
