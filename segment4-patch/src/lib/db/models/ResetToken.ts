import { Schema, model, models } from 'mongoose'
const schema = new Schema({
  email:     { type: String, required: true, lowercase: true, index: true },
  token:     { type: String, required: true, unique: true },
  expiresAt: { type: Date,   required: true, index: { expires: 0 } },
}, { timestamps: true })
export const ResetToken = (models.ResetToken ?? model('ResetToken', schema)) as any
