import { model, Schema } from "mongoose";
import { DefaultTypes } from "../types/models";

const UserSchema: Schema = new Schema({
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
  role: { type: String, required: true },
  birthdate: { type: Date, required: false },
  isActive: { type: String, required: false, default: true },
  isConfirmed: { type: String, required: false, default: false },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false }
})

UserSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.updatedAt) {
    this.updatedAt = now;
  }
  next();
});

export default model<DefaultTypes.users>(
  "User", UserSchema)