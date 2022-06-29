import { model, Schema } from "mongoose";
import { UsersModelsTypes } from "../types/models";

const PsychologistSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  photo: { type: String, required: false },
  about: { type: String, required: false },
  userName: { type: String, required: true },
  phone: { type: String, required: false },
  isActive: { type: String, required: false, default: true },
  isConfirmed: { type: String, required: false, default: false },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false }
})

PsychologistSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.updatedAt) {
    this.updatedAt = now;
  }
  next();
});

export default model<UsersModelsTypes.Psychologist>(
  "Psychologist", PsychologistSchema)