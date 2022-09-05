import { DefaultMessages, StatusCode } from "../constants"
import { Exception } from "../helpers"
import { Patient, Psychologist, User } from "../models"
import { patientModelType } from "../models/patient"
import { PatientTypes } from "../types"
import { getValidation, registerPatientValidation } from "../validations"

export namespace PatientService {
  export const get = async (params: PatientTypes.get) => {
    try {
      const { id, page, perPage } = getValidation.parse(params)

      const [patients, total] = await Promise.all([
        Patient.find(id ? { _id: id } : {}, null, {
          skip: Number((page! - 1) * perPage!) || 0,
          limit: Number(perPage) || 10,
        }).populate(["diagnosis", "mood"]),
        Patient.count(id ? { _id: id } : {}),
      ])

      if (!patients || total === 0) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [
          DefaultMessages.StatusMessage.NOT_FOUND,
        ])
      }

      return { patients, total }
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const register = async (params: PatientTypes.register) => {
    try {
      const { user, psychologist } = registerPatientValidation.parse(params)

      const [userExist, patientExist] = await Promise.all([
        await User.findById({ _id: user }),
        await Patient.findOne({ user }),
      ])

      const psyExist: patientModelType | null = await Psychologist.findById({ _id: psychologist })

      if (!userExist || !psyExist) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["USER NOT FOUND"])
      }

      if (patientExist) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["PATIENT EXIST"])
      }

      const psy = psyExist?.user.valueOf()

      if (user === psy) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["PATIENT AND PSY CANNOT BE THE SAME"])
      }

      const newPatient = await Patient.create({
        user,
        psychologist,
      })

      newPatient
        ? await Promise.all([
            await Psychologist.findByIdAndUpdate(
              { _id: psychologist },
              { $push: { patients: newPatient._id } },
            ),
            await User.findByIdAndUpdate({ _id: user }, { $push: { profession: newPatient._id } }),
          ])
        : null

      return newPatient
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }
}
