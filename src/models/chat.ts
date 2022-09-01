import { model, Schema } from "mongoose"
import { CallModelsTypes } from "../types/models"

const ChatSchema: Schema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  psychologist: { type: Schema.Types.ObjectId, ref: "Psychologist" },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  PsychologistAccepted: { type: Boolean, default: false },
  PsychologistAcceptedDate: { type: Date },
  messages: { type: Object },
  Status: { type: Object },
  rating: { type: Number },
  finished: { type: Boolean, default: false },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false },
})

ChatSchema.pre("save", function (next) {
  const now = new Date()
  if (!this.updatedAt) {
    this.updatedAt = now
  }
  next()
})

export default model<CallModelsTypes.Chat>("Chats", ChatSchema)
