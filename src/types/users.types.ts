import { z } from 'zod'
import {
  createUserValidation,
  updateUserValidation,
  getValidation,
  idValidation,
} from '../validations'

export namespace UsersTypes {
  export type get = z.infer<typeof getValidation>
  export type create = z.infer<typeof createUserValidation>
  export type update = z.infer<typeof updateUserValidation>
  export type idOnly = z.infer<typeof idValidation>
}
