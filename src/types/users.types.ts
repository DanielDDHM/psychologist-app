import { z } from "zod"
import {
  createUserValidation,
  getUserValidation,
  updateUserValidation,
  userConfirmValidation
} from "../validations/user.validation"

export namespace UsersTypes {
  export type get = z.infer<typeof getUserValidation>
  export type create = z.infer<typeof createUserValidation>
  export type update = z.infer<typeof updateUserValidation>
  export type confirm = z.infer<typeof userConfirmValidation>
}