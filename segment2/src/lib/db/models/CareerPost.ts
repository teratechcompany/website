import { Schema, model, models, type Document } from 'mongoose'
export interface ICareerPost extends Document {
  title:string; slug:string; department:string; type:'full-time'|'part-time'|'contract'|'internship'
  location:string; remote:boolean; description:string; requirements:string[]; nice:string[]
  salary?:string; active:boolean; closingDate?:Date
}
const schema = new Schema<ICareerPost>({
  title:       { type:String, required:true, maxlength:200 },
  slug:        { type:String, required:true, unique:true, lowercase:true },
  department:  { type:String, required:true, maxlength:100 },
  type:        { type:String, enum:['full-time','part-time','contract','internship'], required:true },
  location:    { type:String, maxlength:200, default:'Bamenda, Cameroon' },
  remote:      { type:Boolean, default:false },
  description: { type:String, required:true },
  requirements:{ type:[String], default:[] },
  nice:        { type:[String], default:[] },
  salary:      { type:String, maxlength:100 },
  active:      { type:Boolean, default:true, index:true },
  closingDate: Date,
}, { timestamps:true })
export const CareerPost = models.CareerPost ?? model<ICareerPost>('CareerPost', schema)
