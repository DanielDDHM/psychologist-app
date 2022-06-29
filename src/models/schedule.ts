import { model, Schema } from "mongoose";
import { BusinessModelsTypes } from "../types/models";

const ScheduleSchema: Schema = new Schema({
	psychologist: { type: Schema.Types.ObjectId, ref: 'Psychologist', required: true },
	patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
	date: { type: Date, required: true },
	createdAt: { type: Date, required: false, default: Date.now },
	updatedAt: { type: Date, required: false }
});

ScheduleSchema.pre("save", function (next) {
	const now = new Date();
	if (!this.updatedAt) {
		this.updatedAt = now;
	}
	next();
});

export default model<BusinessModelsTypes.Schedule>(
	"Schedule", ScheduleSchema)