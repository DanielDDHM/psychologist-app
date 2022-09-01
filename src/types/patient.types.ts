import { z } from "zod"
import { getValidation, registerPatientValidation } from "../validations"

export namespace PatientTypes {
  export type register = z.infer<typeof registerPatientValidation>
  export type get = z.infer<typeof getValidation>
}
