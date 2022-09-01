import { z } from "zod"

export const idValidation = z.object({
  id: z.string().min(2, { message: "NON_EMPTY" }),
})

export const getValidation = z.object({
  id: z.string().optional(),
  page: z.number().nonnegative().optional(),
  perPage: z.number().nonnegative().optional(),
})
