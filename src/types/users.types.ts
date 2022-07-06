import { z } from "zod"
import {
  createUserValidation,
  getUserValidation
} from "../validations/user.validation"

export namespace UsersTypes {
  export type get = z.infer<typeof getUserValidation>
  export type create = z.infer<typeof createUserValidation>
}