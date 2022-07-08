import { z } from "zod"

export const registerPsyValidation = z.object({
  user: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .optional(),
  about: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .optional(),
})
