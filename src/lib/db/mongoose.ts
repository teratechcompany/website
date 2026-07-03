import mongoose from 'mongoose'

const URI = process.env.MONGODB_URI
if (!URI) throw new Error('MONGODB_URI is not set in environment variables')
const MONGODB_URI: string = URI

declare global { var _mongoose: Promise<typeof mongoose> | undefined }

async function dbConnect() {
  await (global._mongoose ??= mongoose.connect(MONGODB_URI, {
    dbName:         'teratech',
    bufferCommands: false,
    maxPoolSize:    10,
  }))
}

export default dbConnect
