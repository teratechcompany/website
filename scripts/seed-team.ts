#!/usr/bin/env tsx
/**
 * Seeds all 8 team members with their correct roles.
 * Existing accounts are skipped (not overwritten).
 *
 * Usage:
 *   npx tsx scripts/seed-team.ts
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt   from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true, unique: true, lowercase: true },
  password:      { type: String, required: true },
  role:          { type: String, required: true },
  emailVerified: { type: Boolean, default: true },
}, { timestamps: true })

// ── Team roster ────────────────────────────────────────────────────────
// IMPORTANT: change passwords immediately after first login.
// Emails follow the pattern firstname@teratechcompany.tech — update as needed.
const TEAM = [
  { name: 'Sir Tita Tera',       email: 'tita@teratechcompany.tech',       role: 'admin',    password: 'TeraAdmin2025!'    },
  { name: 'Engr. Nde Alban',     email: 'nde@teratechcompany.tech',        role: 'admin',    password: 'TeraAdmin2025!'    },
  { name: 'Engr. Foncho Afanwi', email: 'foncho@teratechcompany.tech',     role: 'staff',    password: 'TeraStaff2025!'    },
  { name: 'Engr. Faye Rauda',    email: 'faye@teratechcompany.tech',       role: 'hr_admin', password: 'TeraHR2025!'       },
  { name: 'Mr. Fomonyuy Fomo',   email: 'fomo@teratechcompany.tech',       role: 'staff',    password: 'TeraStaff2025!'    },
  { name: 'Ms. Stevie Ange',     email: 'stevie@teratechcompany.tech',     role: 'staff',    password: 'TeraStaff2025!'    },
  { name: 'Mr. Idrish Farash',   email: 'idrish@teratechcompany.tech',     role: 'staff',    password: 'TeraStaff2025!'    },
  { name: 'Ms. Abihbombi Brida', email: 'abihbombi@teratechcompany.tech',  role: 'staff',    password: 'TeraStaff2025!'    },
]

async function seed() {
  const URI = process.env.MONGODB_URI
  if (!URI) { console.error('❌  MONGODB_URI not set'); process.exit(1) }

  console.log('\n🔌  Connecting…')
  await mongoose.connect(URI, { dbName: 'teratech' })
  const User = mongoose.models.User ?? mongoose.model('User', UserSchema)

  let created = 0; let skipped = 0
  for (const member of TEAM) {
    const exists = await User.exists({ email: member.email })
    if (exists) { console.log(`  ⏭   Skipped  (exists): ${member.email}`); skipped++; continue }
    const hash = await bcrypt.hash(member.password, 12)
    await User.create({ ...member, password: hash })
    console.log(`  ✅  Created  (${member.role.padEnd(8)}): ${member.email}`)
    created++
  }

  console.log(`\n  Created: ${created} · Skipped: ${skipped}`)
  console.log('\n  ⚠️   All default passwords are:')
  console.log('       admin/cto  →  TeraAdmin2025!')
  console.log('       hr_admin   →  TeraHR2025!')
  console.log('       staff      →  TeraStaff2025!')
  console.log('\n  → Change all passwords immediately via the admin panel.\n')

  await mongoose.disconnect()
}

seed().catch(err => { console.error('❌  Failed:', err.message); process.exit(1) })
