#!/usr/bin/env tsx
/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  TERA-TECH — Admin Seed Script                          ║
 * ║  Run ONCE to create the first admin account.            ║
 * ║                                                          ║
 * ║  Usage:                                                  ║
 * ║    npx tsx scripts/seed-admin.ts                        ║
 * ║                                                          ║
 * ║  Or with custom credentials:                            ║
 * ║    ADMIN_EMAIL=you@example.com \                        ║
 * ║    ADMIN_PASSWORD=YourPassword1 \                       ║
 * ║    ADMIN_NAME="Your Name" \                             ║
 * ║    npx tsx scripts/seed-admin.ts                        ║
 * ╚══════════════════════════════════════════════════════════╝
 */

import 'dotenv/config'
import mongoose, { type Model } from 'mongoose'
import bcrypt      from 'bcryptjs'

// ── Inline model (avoids import path issues when running outside Next.js) ──
const UserSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true, unique: true, lowercase: true },
  password:      { type: String, required: true },
  role:          { type: String, default: 'admin' },
  emailVerified: { type: Boolean, default: true },
}, { timestamps: true })

async function seed() {
  const URI = process.env.MONGODB_URI
  if (!URI) {
    console.error('\n❌  MONGODB_URI is not set.\n    Copy .env.example → .env.local and fill in your MongoDB connection string.\n')
    process.exit(1)
  }

  const NAME     = process.env.ADMIN_NAME     ?? 'Sir Tita Tera'
  const EMAIL    = process.env.ADMIN_EMAIL    ?? 'admin@teratechcompany.tech'
  const PASSWORD = process.env.ADMIN_PASSWORD ?? 'TeraAdmin2025!'

  // Password strength check
  if (PASSWORD.length < 8 || !/[A-Z]/.test(PASSWORD) || !/[0-9]/.test(PASSWORD)) {
    console.error('\n❌  Password must be at least 8 characters with one uppercase letter and one number.\n')
    process.exit(1)
  }

  console.log('\n🔌  Connecting to MongoDB…')
  await mongoose.connect(URI, { dbName: 'teratech' })
  console.log('✅  Connected')

  const User = (mongoose.models.User as Model<any> | undefined) ?? (mongoose.model<any>('User', UserSchema) as Model<any>)

  const existing = await User.findOne({ email: EMAIL })
  if (existing) {
    if (existing.role !== 'admin') {
      await User.updateOne({ email: EMAIL }, { role: 'admin', emailVerified: true })
      console.log(`\n✅  Existing user "${EMAIL}" upgraded to admin role.\n`)
    } else {
      console.log(`\nℹ️   Admin already exists: ${EMAIL}`)
      console.log('    No changes made.\n')
    }
    await mongoose.disconnect()
    return
  }

  const hash = await bcrypt.hash(PASSWORD, 12)
  await User.create({ name: NAME, email: EMAIL, password: hash, role: 'admin', emailVerified: true })

  console.log('\n╔══════════════════════════════════════════════╗')
  console.log('║  ✅  Admin account created successfully       ║')
  console.log('╠══════════════════════════════════════════════╣')
  console.log(`║  Name     : ${NAME.padEnd(32)}║`)
  console.log(`║  Email    : ${EMAIL.padEnd(32)}║`)
  console.log(`║  Password : ${PASSWORD.padEnd(32)}║`)
  console.log(`║  Role     : admin                            ║`)
  console.log('╠══════════════════════════════════════════════╣')
  console.log('║  → Go to /login and sign in now              ║')
  console.log('║  → CHANGE THIS PASSWORD after first login    ║')
  console.log('╚══════════════════════════════════════════════╝\n')

  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('\n❌  Seed failed:', err.message, '\n')
  process.exit(1)
})
