'use client'
import { useState }             from 'react'
import { computePayroll }       from '@/lib/payroll/compute'
import type { PayrollResult }   from '@/lib/payroll/compute'
import { formatCurrency }       from '@/lib/utils/format'

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
      <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 'var(--s8)' }}>Payroll Manager</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>
        Cameroon IRPP · CNPS · CSS · CAC computation
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s32)', alignItems: 'start' }}>

        {/* Input panel */}
        <div className="card" style={{ padding: 'var(--s32)' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: 'var(--s20)' }}>
            Payroll inputs
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s6)' }}>
                {extras.map((e, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--white-muted)', padding: 'var(--s6) var(--s10)', background: 'var(--black-elevated)', borderRadius: 'var(--radius-sharp)' }}>
                    <span>{e.label}</span>
                    <div style={{ display: 'flex', gap: 'var(--s12)', alignItems: 'center' }}>
                      <span>{fmt(e.amount)}</span>
                      <button onClick={() => setExtras(ex => ex.filter((_, j) => j !== i))} style={{ color: 'var(--danger)', fontSize: 11 }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 'var(--s8)' }}>
              <input className="input" value={extraLbl} onChange={e => setExtraLbl(e.target.value)} placeholder="Deduction label" style={{ flex: 2 }} />
              <input className="input" type="number" value={extraAmt} onChange={e => setExtraAmt(e.target.value)} placeholder="Amount" style={{ flex: 1 }} min="0" />
              <button className="btn btn-ghost btn-sm" onClick={addExtra}>Add</button>
            </div>

            <button className="btn btn-blue" onClick={compute} style={{ marginTop: 'var(--s8)' }}>
              Compute payroll
            </button>
          </div>
        </div>

        {/* Result panel */}
        {result ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
            {/* Summary card */}
            <div className="card" style={{ padding: 'var(--s32)', borderColor: 'var(--brand-blue-border)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: 'var(--s20)' }}>
                {name || 'Employee'} · {period}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s10)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--s12)', borderBottom: '1px solid var(--white-faint)' }}>
                  <span style={{ color: 'var(--white-muted)', fontSize: 'var(--text-sm)' }}>Gross salary</span>
                  <span style={{ color: 'var(--white)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>{fmt(result.gross)}</span>
                </div>
                {result.deductions.map(d => (
                  <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--white-muted)', fontSize: 13 }}>- {d.label}</span>
                    <span style={{ color: 'var(--danger)', fontSize: 13 }}>({fmt(d.amount)})</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--s12)', borderTop: '2px solid var(--brand-blue-border)', marginTop: 'var(--s6)' }}>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--white)' }}>Net salary</span>
                  <span style={{ fontSize: 'var(--text-xl)', fontWeight: 300, color: 'var(--brand-cyan)', letterSpacing: '-0.02em' }}>{fmt(result.net)}</span>
                </div>
              </div>
            </div>

            {/* Effective rate */}
            <div className="card" style={{ padding: 'var(--s20)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s8)' }}>
                <span style={{ fontSize: 12, color: 'var(--white-muted)' }}>Total deductions</span>
                <span style={{ fontSize: 12, color: 'var(--danger)' }}>{fmt(result.gross - result.net)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--white-muted)' }}>Effective tax rate</span>
                <span style={{ fontSize: 12, color: 'var(--brand-orange)' }}>
                  {result.gross > 0 ? ((result.gross - result.net) / result.gross * 100).toFixed(1) : 0}%
                </span>
              </div>
              {/* Visual bar */}
              <div style={{ height: 4, background: 'var(--white-faint)', borderRadius: 2, marginTop: 'var(--s12)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 2, background: 'var(--brand-blue)', width: `${result.gross > 0 ? (result.net / result.gross * 100) : 0}%`, transition: 'width 0.5s var(--ease)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--s6)' }}>
                <span style={{ fontSize: 10, color: 'var(--white-subtle)' }}>Net ({result.gross > 0 ? (result.net / result.gross * 100).toFixed(0) : 0}%)</span>
                <span style={{ fontSize: 10, color: 'var(--white-subtle)' }}>Deducted ({result.gross > 0 ? ((result.gross - result.net) / result.gross * 100).toFixed(0) : 0}%)</span>
              </div>
            </div>

            {/* Save */}
            <button className="btn btn-orange" onClick={save} disabled={saving || saved || !name}>
              {saved ? '✓ Saved to records' : saving ? '···' : 'Save payroll record'}
            </button>
            <p style={{ fontSize: 11, color: 'var(--white-subtle)', textAlign: 'center' }}>
              Saving will create a payroll record in the database for {name || 'this employee'} for {period}.
            </p>
          </div>
        ) : (
          <div className="card" style={{ padding: 'var(--s48)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--s12)', minHeight: 300 }}>
            <div style={{ width: 48, height: 48, background: 'var(--brand-blue-faint)', borderRadius: 'var(--radius-sharp)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>₣</div>
            <p style={{ color: 'var(--white-muted)', fontSize: 'var(--text-sm)' }}>Enter gross salary and click Compute to see the full payroll breakdown.</p>
          </div>
        )}
      </div>
    </div>
  )
}
