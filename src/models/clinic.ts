import { model, Schema } from "mongoose"
import { BusinessModelsTypes } from "../types/models"

const ClinicSchema: Schema = new Schema({
  isActive: { type: Boolean, default: true },
  image: { type: String },
  logo: { type: String },
  name: { type: String },
  address: { type: String },
  address2: { type: String },
  postalCode: { type: String },
  city: { type: String },
  country: { type: String },
  state: { type: String },
  email: { type: String },
  phone: { type: String },
  consultationsPerUser: { type: Number },
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

export default model<BusinessModelsTypes.Clinic>("Chats", ClinicSchema)
