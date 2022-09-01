import { model, Schema } from 'mongoose'
import { UsersModelsTypes } from '../types/models'

const PsychologistSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
  about: { type: String, required: false },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false },
})

PsychologistSchema.pre('save', function (next) {
  const now = new Date()
  if (!this.updatedAt) {
    this.updatedAt = now
  }
  next()
})

export default model<UsersModelsTypes.Psychologist>('Psychologist', PsychologistSchema)
