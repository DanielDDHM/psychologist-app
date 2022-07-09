import { z } from "zod"
import {
  getValidation,
  registerPsyValidation
} from "../validations"

export namespace PsyTypes {
  export type register = z.infer<typeof registerPsyValidation>
  export type get = z.infer<typeof getValidation>
}