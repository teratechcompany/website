import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import dbConnect        from '@/lib/db/mongoose'
import { Partner }      from '@/lib/db/models/Partner'
import { AddPartnerForm } from '@/components/admin/AddPartnerForm'

export default async function AdminPartnersPage() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const partners = await Partner.find().sort({ placements: -1 }).lean() as any[]

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 'var(--s8)' }}>Partner Management</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>{partners.length} partner organisations</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s32)', alignItems: 'start' }}>
        <AddPartnerForm />
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Partner</th><th>Sector</th><th>Placements</th></tr></thead>
            <tbody>
              {partners.length === 0
                ? <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--white-subtle)', padding: 'var(--s32)' }}>No partners yet</td></tr>
                : partners.map(p => (
                  <tr key={p._id}>
                    <td>
                      <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{p.name}</p>
                      {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'var(--brand-blue)' }}>{p.website}</a>}
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--white-muted)' }}>{p.sector || '—'}</td>
                    <td><span className="badge badge-blue" style={{ fontSize: 10 }}>{p.placements}</span></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
