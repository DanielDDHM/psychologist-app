import { model, Schema } from "mongoose";
import { DefaultModelsTypes } from "../types/models";

const LibrarySchema: Schema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'LibraryCategory' },
  type: { type: String, enum: { values: ['article', 'video', 'audio'] } },
  image: { type: String },
  video: { type: String },
  audio: { type: String },
  name: { type: String },
  description: { type: String },
  published: { type: Boolean, deafult: false },
  publishSchedule: { type: Boolean, default: false },
  publishScheduleDate: { type: Date },
})

LibrarySchema.pre("save", function (next) {
  const now = new Date();
  if (!this.updatedAt) {
    this.updatedAt = now;
  }
  next();
});

export default model<DefaultModelsTypes.LibraryDefault>(
  "Library", LibrarySchema)