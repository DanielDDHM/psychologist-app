import { model, Schema } from "mongoose"
import { CallModelsTypes } from "../types/models"

const ChatSchema: Schema = new Schema({
  name: { type: String, required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  psychologist: { type: Schema.Types.ObjectId, ref: "Psychologist" },
  endDate: { type: Date },
  messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
  Status: { type: Object },
  started: { type: Boolean, default: false },
  startDate: { type: Date },
  finished: { type: Boolean, default: false },
  rating: { type: Number },
  avaliation: { type: String },
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
