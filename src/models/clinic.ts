import { model, Schema } from "mongoose"
import { BusinessModelsTypes } from "../types"

const ClinicSchema: Schema = new Schema({
  name: { type: String },
  image: { type: String },
  address: { type: Object },
  isActive: { type: Boolean, default: true },
  psychologists: [
    {
      type: Schema.Types.ObjectId,
      ref: "Psychologist",
    },
  ],
  email: { type: String },
  phone: { type: String },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false },
})

ClinicSchema.pre("save", function (next) {
  const now = new Date()
  if (!this.updatedAt) {
    this.updatedAt = now
  }
  next()
})

export default model<BusinessModelsTypes.Clinic>("Clinic", ClinicSchema)
