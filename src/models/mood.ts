import { model, Schema } from "mongoose";
import { UsersModelsTypes } from "../types";

const MoodSchema: Schema = new Schema({
	patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
	date: { type: Date },
	mood: {
		type: String,
		enum: ['NORMAL', 'HAPPY', 'ANGRY', 'SAD'],
		default: 'NORMAL'
	},
	createdAt: { type: Date, required: false, default: Date.now },
	updatedAt: { type: Date, required: false }
});

MoodSchema.pre("save", function (next) {
	const now = new Date();
	if (!this.updatedAt) {
		this.updatedAt = now;
	}
	next();
});

export default model<UsersModelsTypes.Mood>(
	"Mood", MoodSchema)