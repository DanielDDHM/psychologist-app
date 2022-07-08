import { z } from "zod"

export const registerPatientValidation = z.object({
  user: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .optional(),
})
