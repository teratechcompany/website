#!/usr/bin/env tsx
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '@/lib/db/models/User'

async function test() {
  const URI = process.env.MONGODB_URI
  if (!URI) {
    console.error('MONGODB_URI not set')
    process.exit(1)
  }

  console.log('🔌 Connecting to MongoDB...')
  await mongoose.connect(URI, { dbName: 'teratech' })
  console.log('✅ Connected')

  // List all users
  console.log('\n📋 Checking users in database...')
  const users = await User.find().select('+password')
  console.log(`Found ${users.length} users:\n`)
  
  for (const user of users) {
    console.log(`Email: ${user.email}`)
    console.log(`Name: ${user.name}`)
    console.log(`Role: ${user.role}`)
    console.log(`Email Verified: ${user.emailVerified}`)
    console.log(`Password Hash: ${user.password.substring(0, 20)}...`)
    
    // Test password matching
    const testPass = 'TeraAdmin2025!'
    const match = await bcrypt.compare(testPass, user.password)
    console.log(`Password Match (TeraAdmin2025!): ${match}`)
    console.log('---')
  }

  await mongoose.disconnect()
  console.log('\n✅ Test complete')
}

test().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
