import { Schema, model, models, type Document } from 'mongoose'
export interface IPartner extends Document {
  name:        string
  logo?:       string
  website?:    string
  sector:      string
  location:    string
  contact?:    string
  placements:  number
  active:      boolean
  since?:      number
}
const schema = new Schema<IPartner>({
  name:       { type:String, required:true, maxlength:200 },
  logo:       { type:String, maxlength:500 },
  website:    { type:String, maxlength:500 },
  sector:     { type:String, maxlength:100 },
  location:   { type:String, maxlength:200 },
  contact:    { type:String, maxlength:200 },
  placements: { type:Number, default:0 },
  active:     { type:Boolean, default:true, index:true },
  since:      Number,
}, { timestamps:true })
export const Partner = models.Partner ?? model<IPartner>('Partner', schema)
