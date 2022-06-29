import { model, Schema } from "mongoose";
import { UsersModelsTypes } from "../types/models";

const DiagnosisSchema: Schema = new Schema({
	patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
	isActive: { type: Boolean, default: false },
	diagnosis: { type: String, required: true },
	createdAt: { type: Date, required: false, default: Date.now },
	updatedAt: { type: Date, required: false }
});

DiagnosisSchema.pre("save", function (next) {
	const now = new Date();
	if (!this.updatedAt) {
		this.updatedAt = now;
	}
	next();
});

export default model<UsersModelsTypes.Diagnosis>(
	"Diagnosis", DiagnosisSchema)