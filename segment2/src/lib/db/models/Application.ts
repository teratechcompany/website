import { Schema, model, models, type Document, type Types } from 'mongoose'
import type { TrackId } from '@/constants/tracks'

export type AppStatus = 'draft'|'submitted'|'screening'|'interview'|'offered'|'accepted'|'rejected'|'withdrawn'

export interface IApplication extends Document {
  userId:      Types.ObjectId
  track:       TrackId
  status:      AppStatus
  personalInfo:{ name:string; email:string; phone:string; location:string; nationality:string }
  background:  { education:string; experience:string; motivation:string; availability:string }
  cvUrl?:      string
  portfolioUrl?:string
  notes:       string
  reviewedBy?: Types.ObjectId
  submittedAt?:Date
  createdAt:   Date
  updatedAt:   Date
}

const schema = new Schema<IApplication>({
  userId:  { type:Schema.Types.ObjectId, ref:'User', required:true, index:true },
  track:   { type:String, required:true, enum:['frontend','backend','uiux','mobile','data','cloud','security','marketing'] },
  status:  { type:String, default:'draft', enum:['draft','submitted','screening','interview','offered','accepted','rejected','withdrawn'], index:true },
  personalInfo:{ name:{type:String,maxlength:100}, email:{type:String,maxlength:254}, phone:{type:String,maxlength:20}, location:{type:String,maxlength:200}, nationality:{type:String,maxlength:100} },
  background:  { education:{type:String,maxlength:2000}, experience:{type:String,maxlength:2000}, motivation:{type:String,maxlength:3000}, availability:{type:String,maxlength:200} },
  cvUrl:        { type:String, maxlength:500 },
  portfolioUrl: { type:String, maxlength:500 },
  notes:        { type:String, maxlength:5000, default:'' },
  reviewedBy:   { type:Schema.Types.ObjectId, ref:'User' },
  submittedAt:  Date,
}, { timestamps:true })

export const Application = models.Application ?? model<IApplication>('Application', schema)
