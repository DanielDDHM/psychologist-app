// import bcrypt from 'bcrypt';
import { model, Schema } from "mongoose";
import { UsersModelsTypes } from "../types";

const PatientSchema: Schema = new Schema({
  name: { type: String, required: false },
  birthdate: { type: Date, required: false },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  photo: { type: String, required: false },
  psychologist: {
    type: Schema.Types.ObjectId,
    ref: 'Psychologist'
  },
})

PatientSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.updatedAt) {
    this.updatedAt = now;
  }
  next();
});

export default model<UsersModelsTypes.Patient>(
  "Patient", PatientSchema)