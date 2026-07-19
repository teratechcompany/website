import { Schema, model, models, type Document, type Types } from 'mongoose'
export interface IPerformanceReview extends Document {
  internId:    Types.ObjectId
  userId:      Types.ObjectId
  reviewedBy:  Types.ObjectId
  period:      'mid-term' | 'end-term'
  scores:      { category:string; score:number; max:number; comment:string }[]
  overall:     number   // 0-100
  strengths:   string
  improvements:string
  recommendation: 'hire' | 'extend' | 'complete' | 'terminate'
  submitted:   boolean
}
const schema = new Schema<IPerformanceReview>({
  internId:    { type:Schema.Types.ObjectId, ref:'Intern', required:true },
  userId:      { type:Schema.Types.ObjectId, ref:'User', required:true },
  reviewedBy:  { type:Schema.Types.ObjectId, ref:'User', required:true },
  period:      { type:String, enum:['mid-term','end-term'], required:true },
  scores:      [{ category:String, score:Number, max:Number, comment:String }],
  overall:     { type:Number, min:0, max:100, default:0 },
  strengths:   { type:String, maxlength:2000, default:'' },
  improvements:{ type:String, maxlength:2000, default:'' },
  recommendation:{ type:String, enum:['hire','extend','complete','terminate'] },
  submitted:   { type:Boolean, default:false },
}, { timestamps:true })
schema.index({ internId:1, period:1 })
export const PerformanceReview = models.PerformanceReview ?? model<IPerformanceReview>('PerformanceReview', schema)
