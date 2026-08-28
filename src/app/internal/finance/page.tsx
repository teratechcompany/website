import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import dbConnect        from '@/lib/db/mongoose'
import { PayrollRecord } from '@/lib/db/models/PayrollRecord'
import styles from './FinancePage.module.css'

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
      <h1 className={styles.title}>Finance Overview</h1>
      <p className={styles.subtitle}>Financial management centre</p>
      <div className={styles.kpiGrid}>
        <div className={`card ${styles.kpiCard}`}>
          <p className={`${styles.kpiValue} ${styles.kpiValueBlue}`}>{draftPayrolls}</p>
          <p className={styles.kpiLabel}>Draft payrolls</p>
        </div>
        <div className={`card ${styles.kpiCard}`}>
          <p className={`${styles.kpiValue} ${styles.kpiValueOrange}`}>{pendingPay}</p>
          <p className={styles.kpiLabel}>Awaiting payment</p>
        </div>
        <div className={`card ${styles.kpiCardCenter}`}>
          <Link href="/internal/finance/payroll" className={`btn btn-blue btn-sm ${styles.btnFull}`}>Manage Payroll →</Link>
          <Link href="/internal/finance/reports"  className={`btn btn-ghost btn-sm ${styles.btnFull}`}>View Reports →</Link>
        </div>
      </div>
      <div className={`card ${styles.tableCard}`}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent payroll records</h2>
        </div>
        <table className="data-table">
          <thead><tr><th>Staff</th><th>Period</th><th>Gross</th><th>Net</th><th>Status</th></tr></thead>
          <tbody>
            {recentPayroll.length === 0
              ? <tr><td colSpan={5} className={styles.emptyState}>No payroll records yet</td></tr>
              : recentPayroll.map(r => (
                <tr key={r._id}>
                  <td>{r.userId?.name ?? '—'}</td>
                  <td>{r.period}</td>
                  <td>{Number(r.gross).toLocaleString('fr-CM')} {r.currency}</td>
                  <td className={styles.netValue}>{Number(r.net).toLocaleString('fr-CM')} {r.currency}</td>
                  <td><span className={`badge ${r.status==='paid'?'badge-green':r.status==='approved'?'badge-cyan':'badge-gray'} ${styles.statusBadge}`}>{r.status}</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
