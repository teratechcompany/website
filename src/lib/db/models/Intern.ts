import { Schema, model, models, type Document, type Model, type Types } from 'mongoose'
export interface IIntern extends Document {
  userId:       Types.ObjectId
  applicationId:Types.ObjectId
  track:        string
  cohort:       string        // e.g. "2025-Q1"
  mentor?:      string
  startDate:    Date
  endDate?:     Date
  status:       'active' | 'completed' | 'terminated'
  tasks:        { title:string; status:'pending'|'done'; dueDate?:Date }[]
  attendance:   { date:Date; present:boolean; note?:string }[]
  notes:        string
}
const schema = new Schema<IIntern>({
  userId:        { type:Schema.Types.ObjectId, ref:'User', required:true, index:true },
  applicationId: { type:Schema.Types.ObjectId, ref:'Application', required:true },
  track:         { type:String, required:true },
  cohort:        { type:String, required:true, index:true },
  mentor:        String,
  startDate:     { type:Date, required:true },
  endDate:       Date,
  status:        { type:String, enum:['active','completed','terminated'], default:'active', index:true },
  tasks:         [{ title:String, status:{ type:String, enum:['pending','done'], default:'pending' }, dueDate:Date }],
  attendance:    [{ date:Date, present:Boolean, note:String }],
  notes:         { type:String, default:'' },
}, { timestamps:true })
export const Intern = (models.Intern as Model<IIntern> | undefined) ?? (model<IIntern>('Intern', schema) as Model<IIntern>)
