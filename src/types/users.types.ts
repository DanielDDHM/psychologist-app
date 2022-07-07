import { z } from "zod"
import {
  createUserValidation,
  getUserValidation,
  updateUserValidation,
  idValidation
} from "../validations/user.validation"

export namespace UsersTypes {
  export type get = z.infer<typeof getUserValidation>
  export type create = z.infer<typeof createUserValidation>
  export type update = z.infer<typeof updateUserValidation>
  export type idOnly = z.infer<typeof idValidation>
}