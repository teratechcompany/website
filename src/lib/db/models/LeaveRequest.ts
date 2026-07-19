import { Schema, model, models, type Document, type Types } from 'mongoose'
export interface ILeaveRequest extends Document {
  userId:    Types.ObjectId
  internId?: Types.ObjectId
  type:      'annual' | 'sick' | 'personal' | 'emergency'
  from:      Date
  to:        Date
  days:      number
  reason:    string
  status:    'pending' | 'approved' | 'rejected'
  reviewedBy?:Types.ObjectId
  reviewNote?:string
}
const schema = new Schema<ILeaveRequest>({
  userId:     { type:Schema.Types.ObjectId, ref:'User', required:true, index:true },
  internId:   { type:Schema.Types.ObjectId, ref:'Intern' },
  type:       { type:String, enum:['annual','sick','personal','emergency'], required:true },
  from:       { type:Date, required:true },
  to:         { type:Date, required:true },
  days:       { type:Number, required:true },
  reason:     { type:String, required:true, maxlength:500 },
  status:     { type:String, enum:['pending','approved','rejected'], default:'pending', index:true },
  reviewedBy: { type:Schema.Types.ObjectId, ref:'User' },
  reviewNote: { type:String, maxlength:500 },
}, { timestamps:true })
export const LeaveRequest = models.LeaveRequest ?? model<ILeaveRequest>('LeaveRequest', schema)
