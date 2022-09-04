import { z } from "zod"
import {
  destroyDiagnosisValidation,
  editDiagnosisValidation,
  getDiagnosisValidation,
  postDiagnosisValidation,
} from "../validations"

export namespace DiagnosisTypes {
  export type get = z.infer<typeof getDiagnosisValidation>
  export type post = z.infer<typeof postDiagnosisValidation>
  export type edit = z.infer<typeof editDiagnosisValidation>
  export type destroy = z.infer<typeof destroyDiagnosisValidation>
}
