import { requireRole } from '@/lib/auth/guards'
import { ROLES }       from '@/constants/roles'
export default async function Page() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Documents & Contracts</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>Offer letters, NDAs, and intern agreements.</p>
      <div className="card" style={{ textAlign:'center', padding:'var(--s48)' }}>
        <p style={{ color:'var(--white-muted)' }}>This module is ready for data. Add records via the API or admin panel.</p>
      </div>
    </div>
  )
}
