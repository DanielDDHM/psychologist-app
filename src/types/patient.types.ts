import { z } from "zod"
import { registerPatientValidation } from "../validations"

export namespace PatientTypes {
  export type register = z.infer<typeof registerPatientValidation>
}