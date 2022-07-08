import { z } from "zod"
import { registerPsyValidation } from "../validations"

export namespace PsyTypes {
  export type register = z.infer<typeof registerPsyValidation>
}