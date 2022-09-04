import { z } from "zod"
import {
  deleteMoodValidation,
  editMoodValidation,
  getMoodValidation,
  postMoodValidation,
} from "../validations"

export namespace MoodTypes {
  export type get = z.infer<typeof getMoodValidation>
  export type post = z.infer<typeof postMoodValidation>
  export type edit = z.infer<typeof editMoodValidation>
  export type destroy = z.infer<typeof deleteMoodValidation>
}
