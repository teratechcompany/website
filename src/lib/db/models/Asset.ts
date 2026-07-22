import { Schema, model, models, type Document, type Model, type Types } from 'mongoose'
export interface IAsset extends Document {
  name:       string
  type:       'laptop' | 'phone' | 'peripheral' | 'access-card' | 'other'
  serial?:    string
  assignedTo?:Types.ObjectId
  assignedAt?:Date
  returnedAt?:Date
  condition:  'good' | 'fair' | 'damaged'
  notes:      string
}
const schema = new Schema<IAsset>({
  name:       { type:String, required:true, maxlength:200 },
  type:       { type:String, enum:['laptop','phone','peripheral','access-card','other'], required:true },
  serial:     { type:String, maxlength:100 },
  assignedTo: { type:Schema.Types.ObjectId, ref:'User' },
  assignedAt: Date,
  returnedAt: Date,
  condition:  { type:String, enum:['good','fair','damaged'], default:'good' },
  notes:      { type:String, maxlength:500, default:'' },
}, { timestamps:true })
schema.index({ assignedTo:1 })
export const Asset = (models.Asset as Model<IAsset> | undefined) ?? (model<IAsset>('Asset', schema) as Model<IAsset>)
