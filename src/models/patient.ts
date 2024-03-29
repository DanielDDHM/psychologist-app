import { InferSchemaType, model, Schema } from "mongoose"
import { UsersModelsTypes } from "../types"

const PatientSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  psychologist: {
    type: Schema.Types.ObjectId,
    ref: "Psychologist",
  },
  diagnosis: [{ type: Schema.Types.ObjectId, ref: "Diagnosis" }],
  mood: [{ type: Schema.Types.ObjectId, ref: "Mood" }],
})

PatientSchema.pre("save", function (next) {
  const now = new Date()
  if (!this.updatedAt) {
    this.updatedAt = now
  }
  next()
})

export default model<UsersModelsTypes.Patient>("Patient", PatientSchema)

export type patientModelType = InferSchemaType<typeof PatientSchema>
