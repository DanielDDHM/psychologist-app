import { StatusCode } from "../constants"
import { Exception } from "../helpers"
import { Patient, Psychologist, User } from "../models"
import { PatientTypes } from "../types"
import { registerPatientValidation } from "../validations"

export namespace PatientService {
  export const register = async (params: PatientTypes.register) => {
    try {
      const { user, psychologist } = registerPatientValidation.parse(params)

      const [userExist, patientExist, psyExist] = await Promise.all([
        await User.findById({ _id: user }),
        await Patient.findOne({ user }),
        await Psychologist.findById({ _id: psychologist })
      ])

      if (!userExist || !psyExist) {
        throw new Exception.AppError(
          StatusCode.BAD_REQUEST,
          ['USER NOT FOUND'])
      }

      if (patientExist) {
        throw new Exception.AppError(
          StatusCode.BAD_REQUEST,
          ['PATIENT EXIST'])
      }

      const pat = await patientExist?.populate('user', 'id')
      const psy = await psyExist?.populate('user', 'id')

      if (pat?.user?.id === psy?.user?.id) {
        throw new Exception.AppError(
          StatusCode.BAD_REQUEST,
          ['PATIENT AND PSY CANNOT BE THE SAME'])
      }

      const newPatient = await Patient.create({
        user,
        psychologist
      })

      return newPatient

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