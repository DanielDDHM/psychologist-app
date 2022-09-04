import { z } from "zod"

export const getDiagnosisValidation = z.object({
  id: z.string(),
  page: z.number().nonnegative().optional(),
  perPage: z.number().nonnegative().optional(),
})

export const postDiagnosisValidation = z.object({
  id: z.string(),
  diagnosis: z.string(),
})

export const editDiagnosisValidation = z.object({
  id: z.string(),
  diagnosis: z.string(),
})

export const destroyDiagnosisValidation = z.object({
  id: z.string(),
})
