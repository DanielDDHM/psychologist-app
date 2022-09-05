import { model, Schema } from "mongoose"
import { CallModelsTypes } from "../types"

const CallSchema: Schema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  psychologist: { type: Schema.Types.ObjectId, ref: "Psychologist" },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  Room: { type: Object },
  Status: { type: String },
  rating: { type: Number },
  finished: { type: Boolean, default: false },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false },
})

CallSchema.pre("save", function (next) {
  const now = new Date()
  if (!this.updatedAt) {
    this.updatedAt = now
  }
  next()
})

export default model<CallModelsTypes.Call>("Calls", CallSchema)
