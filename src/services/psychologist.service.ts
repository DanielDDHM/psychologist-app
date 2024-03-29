import { DefaultMessages, StatusCode } from "../constants"
import { Exception } from "../helpers"
import { Psychologist, User } from "../models"
import { PsyTypes } from "../types"
import { getValidation, registerPsyValidation } from "../validations"

export namespace PsyService {
  export const get = async (params: PsyTypes.get) => {
    try {
      const { id, page, perPage } = getValidation.parse(params)

      const [psychologists, total] = await Promise.all([
        await Psychologist.find(id ? { _id: id } : {}, null, {
          skip: Number((page! - 1) * perPage!) || 0,
          limit: Number(perPage) || 10,
        }),

        await Psychologist.count(id ? { _id: id } : {}),
      ])

      if (!psychologists) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [
          DefaultMessages.StatusMessage.NOT_FOUND,
        ])
      }

      return { psychologists, total }
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const register = async (params: PsyTypes.register) => {
    try {
      const { user, about } = registerPsyValidation.parse(params)

      const [userExist, psyExist] = await Promise.all([
        User.findById({ _id: user }),
        Psychologist.findOne({ user }),
      ])

      if (!userExist) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["USER NOT FOUND"])
      }

      if (psyExist) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["REGISTER EXISTS"])
      }

      const newPsy = await Psychologist.create({
        user,
        about,
      })

      newPsy ? await User.findByIdAndUpdate(user, { $push: { profession: newPsy._id } }) : null

      return newPsy
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }
}
