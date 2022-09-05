import { DefaultMessages, StatusCode } from "../constants"
import { Exception } from "../helpers"
import { Mood, Patient } from "../models"
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
      const moods = await Mood.find({ patient: id }, null, {
        skip: Number((page! - 1) * perPage!) || 0,
        limit: Number(perPage) || 10,
      })

      if (!moods) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [
          DefaultMessages.StatusMessage.NOT_FOUND,
        ])
      }

      return moods
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const post = async (params: MoodTypes.post) => {
    const { id, mood } = postMoodValidation.parse(params)

    try {
      const mod = await Mood.create({
        patient: id,
        mood: mood,
      })

      mod
        ? await Patient.findByIdAndUpdate(
            id,
            {
              $push: {
                mood: mod._id,
              },
            },
            { returnOriginal: false },
          )
        : null

      return mod
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const edit = async (params: MoodTypes.edit) => {
    const { id, mood } = editMoodValidation.parse(params)

    try {
      const mod = await Mood.findByIdAndUpdate(
        id,
        { $set: { mood: mood } },
        { returnOriginal: false },
      )

      if (!mod) {
        throw new Exception.AppError(StatusCode.BAD_GATEWAY, ["USER NOT UPDATED"])
      }

      return mod
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const destroy = async (params: MoodTypes.destroy) => {
    const { id } = deleteMoodValidation.parse(params)

    try {
      const deleted = await Mood.findByIdAndDelete(id)

      deleted
        ? await Patient.findByIdAndUpdate({ _id: deleted.patient }, { $pull: { mood: id } })
        : null

      return "OK"
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }
}
