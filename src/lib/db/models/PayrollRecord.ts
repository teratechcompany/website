import { Schema, model, models, type Document, type Model, type Types } from 'mongoose'
export interface IPayrollRecord extends Document {
  userId:     Types.ObjectId
  period:     string       // "2025-06"
  gross:      number
  deductions: { label:string; amount:number }[]
  net:        number
  currency:   string
  status:     'draft' | 'approved' | 'paid'
  paidAt?:    Date
  momoRef?:   string
  payslipUrl?:string
}
const schema = new Schema<IPayrollRecord>({
  userId:     { type:Schema.Types.ObjectId, ref:'User', required:true, index:true },
  period:     { type:String, required:true },
  gross:      { type:Number, required:true },
  deductions: [{ label:String, amount:Number }],
  net:        { type:Number, required:true },
  currency:   { type:String, default:'XAF' },
  status:     { type:String, enum:['draft','approved','paid'], default:'draft', index:true },
  paidAt:     Date,
  momoRef:    String,
  payslipUrl: String,
}, { timestamps:true })
schema.index({ userId:1, period:1 }, { unique:true })
export const PayrollRecord = (models.PayrollRecord as Model<IPayrollRecord> | undefined) ?? (model<IPayrollRecord>('PayrollRecord', schema) as Model<IPayrollRecord>)
