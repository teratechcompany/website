import { Schema, model, models, type Model } from 'mongoose'
const schema = new Schema({
  userId:     { type:Schema.Types.ObjectId, ref:'User', required:true },
  action:     { type:String, required:true, maxlength:200 },
  resource:   { type:String, required:true, maxlength:200 },
  resourceId: Schema.Types.ObjectId,
  meta:       Schema.Types.Mixed,
  ip:         { type:String, maxlength:45 },
}, { timestamps:true })
schema.index({ userId:1, createdAt:-1 }); schema.index({ resource:1 })
export const AuditLog = (models.AuditLog as Model<unknown> | undefined) ?? model('AuditLog', schema)
