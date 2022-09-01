import { Messages, StatusCode } from '../constants'
import { Exception } from '../helpers'
import { Patient, Psychologist, User } from '../models'
import { PatientTypes } from '../types'
import { getValidation, registerPatientValidation } from '../validations'

export namespace PatientService {
  export const get = async (params: PatientTypes.get) => {
    try {
      const { id, page, perPage } = getValidation.parse(params)

      const [patients, total] = await Promise.all([
        Patient.find(id ? { _id: id } : {}, null, {
          skip: Number((page! - 1) * perPage!) || 0,
          limit: Number(perPage) || 10,
        }),
        Patient.count(id ? { _id: id } : {}),
      ])

      if (!patients) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [Messages.StatusMessage.NOT_FOUND])
      }

      return { patients, total }
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const register = async (params: PatientTypes.register) => {
    try {
      const { user, psychologist } = registerPatientValidation.parse(params)

      const [userExist, patientExist, psyExist] = await Promise.all([
        await User.findById({ _id: user }),
        await Patient.findOne({ user }),
        await Psychologist.findById({ _id: psychologist }),
      ])

      if (!userExist || !psyExist) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['USER NOT FOUND'])
      }

      if (patientExist) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['PATIENT EXIST'])
      }

      // const psy = psyExist?.user.valueOf()

      // if (user === psy) {
      //   throw new Exception.AppError(
      //     StatusCode.BAD_REQUEST,
      //     ['PATIENT AND PSY CANNOT BE THE SAME'])
      // }

      const newPatient = await Patient.create({
        user,
        psychologist,
      })

      return newPatient
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
}
