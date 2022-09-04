import { StatusCode } from "../constants"
import { Exception } from "../helpers"
import { MoodTypes } from "../types"
import {
  deleteMoodValidation,
  editMoodValidation,
  getMoodValidation,
  postMoodValidation,
} from "../validations"

export namespace MoodService {
  export const get = async (params: MoodTypes.get) => {
    const { id, page, perPage } = getMoodValidation.parse(params)
    try {
      console.log(id, page, perPage)
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const post = async (params: MoodTypes.post) => {
    const { id, mood } = postMoodValidation.parse(params)

    try {
      console.log(id, mood)
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const edit = async (params: MoodTypes.edit) => {
    const { id, mood } = editMoodValidation.parse(params)

    try {
      console.log(id, mood)
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const destroy = async (params: MoodTypes.destroy) => {
    const { id } = deleteMoodValidation.parse(params)

    try {
      console.log(id)
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
}
