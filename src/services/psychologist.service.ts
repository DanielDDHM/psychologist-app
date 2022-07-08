import { StatusCode } from "../constants";
import { Exception } from "../helpers";
import { Psychologist, User } from "../models";
import { PsyTypes } from "../types";
import { registerPsyValidation } from "../validations";

export namespace PsyService {
  export const register = async (params: PsyTypes.register) => {
    try {
      const { user, about } = registerPsyValidation.parse(params)

      const [userExist, psyExist] = await Promise.all([
        User.findById({ _id: user }),
        Psychologist.findOne({ user })
      ])

      console.log({ userExist, psyExist })

      if (!userExist) {
        throw new Exception.AppError(
          StatusCode.BAD_REQUEST,
          ['USER NOT FOUND'])
      }

      if (psyExist) {
        throw new Exception.AppError(
          StatusCode.BAD_REQUEST,
          ['REGISTER EXISTS'])
      }

      const newPsy = await Psychologist.create({
        user,
        about
      })

      return newPsy

    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(
          e?.statusCode,
          e?.messages)
      }
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [e?.message])
    }
  }
}