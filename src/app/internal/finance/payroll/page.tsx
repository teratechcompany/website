'use client'
import { useState }             from 'react'
import { computePayroll }       from '@/lib/payroll/compute'
import type { PayrollResult }   from '@/lib/payroll/compute'
import { formatCurrency }       from '@/lib/utils/format'
import styles from './PayrollPage.module.css'

export default function PayrollPage() {
  const [gross,    setGross]    = useState('')
  const [bonuses,  setBonuses]  = useState('')
  const [name,     setName]     = useState('')
  const [period,   setPeriod]   = useState(() => new Date().toISOString().slice(0, 7))
  const [result,   setResult]   = useState<PayrollResult | null>(null)
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [extraLbl, setExtraLbl] = useState('')
  const [extraAmt, setExtraAmt] = useState('')
  const [extras,   setExtras]   = useState<{ label: string; amount: number }[]>([])

  const addExtra = () => {
    if (!extraLbl || !extraAmt) return
    setExtras(e => [...e, { label: extraLbl, amount: Number(extraAmt) }])
    setExtraLbl(''); setExtraAmt('')
  }

  const compute = () => {
    const g = Number(gross)
    if (!g || g <= 0) return
    setResult(computePayroll({ grossMonthly: g, bonuses: Number(bonuses) || 0, deductions: extras }))
    setSaved(false)
  }

  const save = async () => {
    if (!result) return
    setSaving(true)
    await fetch('/api/internal/payroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, period, ...result }),
    })
    setSaving(false); setSaved(true)
  }

  const fmt = (n: number) => formatCurrency(n, 'XAF')

  return (
    <div>
      <h1 className={styles.title}>Payroll Manager</h1>
      <p className={styles.subtitle}>
        Cameroon IRPP · CNPS · CSS · CAC computation
      </p>

      <div className={styles.layoutGrid}>

        {/* Input panel */}
        <div className={`card ${styles.cardPanel}`}>
          <p className={styles.sectionTitle}>
            Payroll inputs
          </p>
          <div className={styles.fieldList}>
            <div className="field">
              <label className="label" htmlFor="py-name">Employee name</label>
              <input id="py-name" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
            </div>
            <div className="field">
              <label className="label" htmlFor="py-period">Pay period</label>
              <input id="py-period" className="input" type="month" value={period} onChange={e => setPeriod(e.target.value)} />
            </div>
            <div className="field">
              <label className="label" htmlFor="py-gross">Gross monthly salary (XAF)</label>
              <input id="py-gross" className="input" type="number" value={gross} onChange={e => setGross(e.target.value)} placeholder="e.g. 150000" min="0" />
            </div>
            <div className="field">
              <label className="label" htmlFor="py-bonus">Bonuses / allowances (XAF)</label>
              <input id="py-bonus" className="input" type="number" value={bonuses} onChange={e => setBonuses(e.target.value)} placeholder="0" min="0" />
            </div>

            {/* Extra deductions */}
            {extras.length > 0 && (
              <div className={styles.extraList}>
                {extras.map((e, i) => (
                  <div key={i} className={styles.extraItem}>
                    <span>{e.label}</span>
                    <div className={styles.extraActions}>
                      <span>{fmt(e.amount)}</span>
                      <button onClick={() => setExtras(ex => ex.filter((_, j) => j !== i))} className={styles.removeBtn}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.addExtraRow}>
              <input className={`input ${styles.flex2}`} value={extraLbl} onChange={e => setExtraLbl(e.target.value)} placeholder="Deduction label" />
              <input className={`input ${styles.flex1}`} type="number" value={extraAmt} onChange={e => setExtraAmt(e.target.value)} placeholder="Amount" min="0" />
              <button className="btn btn-ghost btn-sm" onClick={addExtra}>Add</button>
            </div>

            <button className={`btn btn-blue ${styles.computeBtn}`} onClick={compute}>
              Compute payroll
            </button>
          </div>
        </div>

        {/* Result panel */}
        {result ? (
          <div className={styles.resultPanel}>
            {/* Summary card */}
            <div className={`card ${styles.summaryCard}`}>
              <p className={styles.sectionTitle}>
                {name || 'Employee'} · {period}
              </p>
              <div className={styles.summaryList}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Gross salary</span>
                  <span className={styles.summaryValue}>{fmt(result.gross)}</span>
                </div>
                {result.deductions.map(d => (
                  <div key={d.label} className={styles.deductionRow}>
                    <span className={styles.deductionLabel}>- {d.label}</span>
                    <span className={styles.deductionValue}>({fmt(d.amount)})</span>
                  </div>
                ))}
                <div className={styles.netRow}>
                  <span className={styles.netLabel}>Net salary</span>
                  <span className={styles.netValue}>{fmt(result.net)}</span>
                </div>
              </div>
            </div>

            {/* Effective rate */}
            <div className={`card ${styles.rateCard}`}>
              <div className={styles.rateRowMb}>
                <span className={styles.rateLabel}>Total deductions</span>
                <span className={styles.rateTotalDeduction}>{fmt(result.gross - result.net)}</span>
              </div>
              <div className={styles.rateRow}>
                <span className={styles.rateLabel}>Effective tax rate</span>
                <span className={styles.ratePercent}>
                  {result.gross > 0 ? ((result.gross - result.net) / result.gross * 100).toFixed(1) : 0}%
                </span>
              </div>
              {/* Visual bar */}
              <div className={styles.barWrapper}>
                <div className={styles.barFill} style={{ width: `${result.gross > 0 ? (result.net / result.gross * 100) : 0}%` } as React.CSSProperties} />
              </div>
              <div className={styles.legendRow}>
                <span className={styles.legendText}>Net ({result.gross > 0 ? (result.net / result.gross * 100).toFixed(0) : 0}%)</span>
                <span className={styles.legendText}>Deducted ({result.gross > 0 ? ((result.gross - result.net) / result.gross * 100).toFixed(0) : 0}%)</span>
              </div>
            </div>

            {/* Save */}
            <button className="btn btn-orange" onClick={save} disabled={saving || saved || !name}>
              {saved ? '✓ Saved to records' : saving ? '···' : 'Save payroll record'}
            </button>
            <p className={styles.saveHelp}>
              Saving will create a payroll record in the database for {name || 'this employee'} for {period}.
            </p>
          </div>
        ) : (
          <div className={`card ${styles.emptyStateCard}`}>
            <div className={styles.iconCircle}>₣</div>
            <p className={styles.emptyText}>Enter gross salary and click Compute to see the full payroll breakdown.</p>
          </div>
        )}
      </div>
    </div>
  )
}
