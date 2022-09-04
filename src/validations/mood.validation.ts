import { z } from "zod"

export const getMoodValidation = z.object({
  id: z.string(),
  page: z.number().nonnegative().optional(),
  perPage: z.number().nonnegative().optional(),
})

export const postMoodValidation = z.object({
  id: z.string(),
  mood: z.string().optional(),
})

export const editMoodValidation = z.object({
  id: z.string(),
  mood: z.string().optional(),
})

export const deleteMoodValidation = z.object({
  id: z.string(),
})
