import { Schema, model, models, type Document } from 'mongoose'
export interface IAlumniProfile extends Document {
  name:string; slug:string; track:string; cohort:number
  company:string; role:string; quote:string; bio:string
  avatar?:string; approved:boolean; linkedIn?:string; location?:string
}
const schema = new Schema<IAlumniProfile>({
  name:     { type:String, required:true, maxlength:100 },
  slug:     { type:String, required:true, unique:true, lowercase:true },
  track:    { type:String, required:true },
  cohort:   { type:Number, required:true },
  company:  { type:String, required:true, maxlength:200 },
  role:     { type:String, required:true, maxlength:200 },
  quote:    { type:String, required:true, maxlength:500 },
  bio:      { type:String, maxlength:1000, default:'' },
  avatar:   { type:String, maxlength:500 },
  approved: { type:Boolean, default:false, index:true },
  linkedIn: { type:String, maxlength:500 },
  location: { type:String, maxlength:200 },
}, { timestamps:true })
schema.index({ approved:1 }); schema.index({ track:1 }); schema.index({ cohort:-1 })
export const AlumniProfile = models.AlumniProfile ?? model<IAlumniProfile>('AlumniProfile', schema)
