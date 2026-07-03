import { Schema, model, models, type Document, type Model } from 'mongoose'
export interface IBlogPost extends Document {
  title:string; slug:string; excerpt:string; content:string
  author:string; authorId:string; publishedAt:Date; published:boolean
  tags:string[]; coverImage?:string; readTime:number; views:number
}
const schema = new Schema<IBlogPost>({
  title:      { type:String, required:true, maxlength:200 },
  slug:       { type:String, required:true, unique:true, lowercase:true },
  excerpt:    { type:String, required:true, maxlength:400 },
  content:    { type:String, required:true },
  author:     { type:String, required:true, maxlength:100 },
  authorId:   { type:String, required:true },
  publishedAt:{ type:Date, default:Date.now },
  published:  { type:Boolean, default:false, index:true },
  tags:       [{ type:String, maxlength:50 }],
  coverImage: { type:String, maxlength:500 },
  readTime:   { type:Number, default:5 },
  views:      { type:Number, default:0 },
}, { timestamps:true })
schema.index({ slug:1 }); schema.index({ published:1, publishedAt:-1 }); schema.index({ tags:1 })
export const BlogPost = (models.BlogPost as Model<IBlogPost> | undefined) ?? model<IBlogPost>('BlogPost', schema)
