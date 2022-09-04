import { StatusCode } from "../constants"
import { Exception } from "../helpers"
import { Diagnosis, Patient } from "../models"
import { DiagnosisTypes } from "../types"
import { destroyDiagnosisValidation, editDiagnosisValidation, getDiagnosisValidation, postDiagnosisValidation } from "../validations"
import { PatientService } from "./patient.service"

export namespace DiagnosticService {
  export const get = async (params: DiagnosisTypes.get) => {
    try {
      const { id, page, perPage } = getDiagnosisValidation.parse(params)

      const [diagnosis, total] = await Promise.all([
        Diagnosis.find({ patient: id }, null, {
          skip: Number((page! - 1) * perPage!) || 0,
          limit: Number(perPage) || 10,
        }),
        Diagnosis.count({ patient: id })
      ])

      if (!diagnosis || total === 0) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["DIAGNOSIS NOT FOUND"])
      }

      return { diagnosis, total }

    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const post = async (params: DiagnosisTypes.post) => {
    try {

      const { id, diagnosis } = postDiagnosisValidation.parse(params)

      await PatientService.get({ id: id })

      const diag = await Diagnosis.create({
        patient: id,
        diagnosis
      })

      if (!diag) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, diag)
      }

      diag
        ? await Patient.findByIdAndUpdate(
          { _id: id },
          { $push: { diagnosis: diag._id } },
        )
        : null

      return diag

    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const edit = async (params: DiagnosisTypes.edit) => {
    try {

      const { id, diagnosis } = editDiagnosisValidation.parse(params)

      const editedDiag = await Diagnosis.findByIdAndUpdate({ _id: id }, { $set: { diagnosis: diagnosis } }, { returnOriginal: false })

      console.log(editedDiag)

      if (!editedDiag) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ['ERROR ON EDIT'])
      }

      return editedDiag

    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const destroy = async (params: DiagnosisTypes.destroy) => {
    try {
      const { id } = destroyDiagnosisValidation.parse(params)

      await Diagnosis.findByIdAndDelete(id)

      return 'OK'
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
}
