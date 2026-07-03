import { Schema, model, models, type Document } from 'mongoose'
export type EventType = 'upcoming'|'past'
export interface IEvent extends Document {
  title:string; slug:string; description:string; content:string
  type:EventType; date:Date; endDate?:Date; location:string; virtual:boolean
  coverImage?:string; capacity?:number; registrations:number
  reportContent?:string; reportImages?:string[]; published:boolean
}
const schema = new Schema<IEvent>({
  title:         { type:String, required:true, maxlength:200 },
  slug:          { type:String, required:true, unique:true, lowercase:true },
  description:   { type:String, required:true, maxlength:500 },
  content:       { type:String, default:'' },
  type:          { type:String, enum:['upcoming','past'], required:true, index:true },
  date:          { type:Date, required:true },
  endDate:       Date,
  location:      { type:String, maxlength:300 },
  virtual:       { type:Boolean, default:false },
  coverImage:    { type:String, maxlength:500 },
  capacity:      Number,
  registrations: { type:Number, default:0 },
  reportContent: String,
  reportImages:  [String],
  published:     { type:Boolean, default:false },
}, { timestamps:true })
schema.index({ slug:1 }); schema.index({ type:1, date:-1 })
export const Event = models.Event ?? model<IEvent>('Event', schema)
