import { Schema, model, models, type Document, type Model } from 'mongoose'
import type { Role } from '@/constants/roles'

export interface IUser extends Document {
  name:          string
  email:         string
  password:      string
  role:          Role
  emailVerified: boolean
  avatar?:       string
  createdAt:     Date
  updatedAt:     Date
}

const schema = new Schema<IUser>({
  name:          { type: String, required: true, trim: true, maxlength: 100 },
  email:         { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
  password:      { type: String, required: true, select: false, minlength: 60 },
  role:          { type: String, required: true, enum: Object.values({ applicant:'applicant',intern:'intern',volunteer:'volunteer',staff:'staff',hr_admin:'hr_admin',admin:'admin' }), default: 'applicant' },
  emailVerified: { type: Boolean, default: false },
  avatar:        { type: String, maxlength: 500 },
}, { timestamps: true })

schema.index({ email: 1 })

export const User = (models.User as Model<IUser> | undefined) ?? model<IUser>('User', schema)
