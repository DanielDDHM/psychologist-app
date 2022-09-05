import { model, Schema } from "mongoose"
import { DefaultModelsTypes } from "../types"

const MessageSchema: Schema = new Schema({
  chat: { type: Schema.Types.ObjectId, ref: "Chats" },
  sentBy: { type: String, enum: ["psychologist", "patient"] },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  psychologist: { type: Schema.Types.ObjectId, ref: "Psychologist" },
  message: { type: String },
  read: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false },
})

MessageSchema.pre("save", function (next) {
  const now = new Date()
  if (!this.updatedAt) {
    this.updatedAt = now
  }
  next()
})

export default model<DefaultModelsTypes.Message>("Messages", MessageSchema)
