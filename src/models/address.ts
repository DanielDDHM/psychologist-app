import { model, Schema } from "mongoose";
import { DefaultModelsTypes } from "../types/models";

const AddressSchema: Schema = new Schema({
  zipCode: { type: String },
  streetNumber: { type: Number },
  street: { type: String },
  neighborhood: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String }
})

AddressSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.updatedAt) {
    this.updatedAt = now;
  }
  next();
});

export default model<DefaultModelsTypes.Address>(
  "Address", AddressSchema)