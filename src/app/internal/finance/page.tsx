import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import dbConnect        from '@/lib/db/mongoose'
import { PayrollRecord } from '@/lib/db/models/PayrollRecord'

export default async function FinancePage() {
  await requireRole(ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const [draftPayrolls, pendingPay] = await Promise.all([
    PayrollRecord.countDocuments({ status:'draft' }),
    PayrollRecord.countDocuments({ status:'approved' }),
  ])
  const recentPayroll = await PayrollRecord.find().populate('userId','name').sort({ createdAt:-1 }).limit(10).lean() as any[]

  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Finance Overview</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>Financial management centre</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--s16)', marginBottom:'var(--s48)' }}>
        <div className="card" style={{ padding:'var(--s24)' }}>
          <p style={{ fontSize:36, fontWeight:200, color:'var(--brand-blue)', letterSpacing:'-0.04em', lineHeight:1, marginBottom:'var(--s8)' }}>{draftPayrolls}</p>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>Draft payrolls</p>
        </div>
        <div className="card" style={{ padding:'var(--s24)' }}>
          <p style={{ fontSize:36, fontWeight:200, color:'var(--brand-orange)', letterSpacing:'-0.04em', lineHeight:1, marginBottom:'var(--s8)' }}>{pendingPay}</p>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>Awaiting payment</p>
        </div>
        <div className="card" style={{ padding:'var(--s24)', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'var(--s12)' }}>
          <Link href="/internal/finance/payroll" className="btn btn-blue btn-sm" style={{ width:'100%', justifyContent:'center' }}>Manage Payroll →</Link>
          <Link href="/internal/finance/reports"  className="btn btn-ghost btn-sm" style={{ width:'100%', justifyContent:'center' }}>View Reports →</Link>
        </div>
      </div>
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ padding:'var(--s16) var(--s24)', borderBottom:'1px solid var(--white-faint)' }}>
          <h2 style={{ fontSize:'var(--text-md)', fontWeight:400 }}>Recent payroll records</h2>
        </div>
        <table className="data-table">
          <thead><tr><th>Staff</th><th>Period</th><th>Gross</th><th>Net</th><th>Status</th></tr></thead>
          <tbody>
            {recentPayroll.length === 0
              ? <tr><td colSpan={5} style={{ textAlign:'center', color:'var(--white-subtle)', padding:'var(--s32)' }}>No payroll records yet</td></tr>
              : recentPayroll.map(r => (
                <tr key={r._id}>
                  <td>{r.userId?.name ?? '—'}</td>
                  <td>{r.period}</td>
                  <td>{Number(r.gross).toLocaleString('fr-CM')} {r.currency}</td>
                  <td style={{ color:'var(--brand-cyan)' }}>{Number(r.net).toLocaleString('fr-CM')} {r.currency}</td>
                  <td><span className={`badge ${r.status==='paid'?'badge-green':r.status==='approved'?'badge-cyan':'badge-gray'}`} style={{ fontSize:10 }}>{r.status}</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
