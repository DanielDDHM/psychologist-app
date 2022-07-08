import { z } from "zod";

export const idValidation = z.object({
  id: z.string()
    .min(2, { message: 'NON_EMPTY' })
})