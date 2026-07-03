import { Schema, model, models, type Document } from 'mongoose'
export interface ITeamMember extends Document {
  name:string; role:string; bio:string; avatar?:string
  order:number; type:'staff'|'volunteer'; linkedIn?:string; active:boolean
}
const schema = new Schema<ITeamMember>({
  name:     { type:String, required:true, maxlength:100 },
  role:     { type:String, required:true, maxlength:200 },
  bio:      { type:String, maxlength:800, default:'' },
  avatar:   { type:String, maxlength:500 },
  order:    { type:Number, default:99 },
  type:     { type:String, enum:['staff','volunteer'], required:true, index:true },
  linkedIn: { type:String, maxlength:500 },
  active:   { type:Boolean, default:true },
}, { timestamps:true })
schema.index({ type:1, order:1 })
export const TeamMember = models.TeamMember ?? model<ITeamMember>('TeamMember', schema)
