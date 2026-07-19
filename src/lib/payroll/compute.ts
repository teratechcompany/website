/**
 * Cameroon payroll computation engine.
 * Based on CNPS/IRPP regulations applicable as of 2025.
 * All amounts in XAF.
 */

export interface PayrollInput {
  grossMonthly:  number   // basic + allowances
  hoursWorked?:  number   // for hourly workers
  hourlyRate?:   number
  bonuses?:      number
  deductions?:   { label: string; amount: number }[]
}

export interface PayrollResult {
  gross:      number
  deductions: { label: string; amount: number }[]
  net:        number
  breakdown: {
    cnpsEmployee: number   // 4.2% of gross (capped at 750k base)
    irpp:         number   // Progressive income tax
    css:          number   // Surtaxe 10% of IRPP
    cac:          number   // Centimes additionnels communaux 10% of IRPP
  }
}

/** CNPS employee contribution: 4.2%, capped at contribution ceiling */
function computeCNPS(gross: number): number {
  const CEILING = 750_000   // monthly contribution ceiling XAF
  const RATE    = 0.042
  return Math.round(Math.min(gross, CEILING) * RATE)
}

/**
 * IRPP — Cameroon progressive income tax on annual taxable income.
 * Monthly gross → annualise → deduct 30% professional costs → apply brackets.
 * Source: DGI tax schedule (Finance Law 2024).
 */
function computeIRPP(gross: number): number {
  const annual  = gross * 12
  const taxable = annual * 0.7   // 30% professional cost deduction

  const BRACKETS: [number, number, number][] = [
    // [from, to, rate]
    [0,        2_000_000,  0.00],
    [2_000_000,3_000_000,  0.10],
    [3_000_000,5_000_000,  0.155],
    [5_000_000,10_000_000, 0.25],
    [10_000_000,Infinity,  0.35],
  ]

  let annualIRPP = 0
  for (const [from, to, rate] of BRACKETS) {
    if (taxable <= from) break
    annualIRPP += (Math.min(taxable, to) - from) * rate
  }

  return Math.round(annualIRPP / 12)   // monthly
}

export function computePayroll(input: PayrollInput): PayrollResult {
  const base  = input.hoursWorked && input.hourlyRate
    ? input.hoursWorked * input.hourlyRate
    : input.grossMonthly
  const gross = base + (input.bonuses ?? 0)

  const cnpsEmployee = computeCNPS(gross)
  const irpp         = computeIRPP(gross - cnpsEmployee)
  const css          = Math.round(irpp * 0.10)
  const cac          = Math.round(irpp * 0.10)

  const statutory: { label: string; amount: number }[] = [
    { label: 'CNPS (employee 4.2%)', amount: cnpsEmployee },
    { label: 'IRPP',                 amount: irpp         },
    { label: 'CSS (10% of IRPP)',    amount: css          },
    { label: 'CAC (10% of IRPP)',    amount: cac          },
  ]
  const extra = input.deductions ?? []
  const all   = [...statutory, ...extra]
  const total = all.reduce((s, d) => s + d.amount, 0)
  const net   = Math.max(0, gross - total)

  return { gross, deductions: all, net, breakdown: { cnpsEmployee, irpp, css, cac } }
}

/** Employer contributions (not deducted from employee — shown separately) */
export function computeEmployerContributions(gross: number) {
  const CEILING = 750_000
  const base    = Math.min(gross, CEILING)
  return {
    cnpsRetirement:    Math.round(base * 0.042),  // 4.2%
    cnpsPension:       Math.round(base * 0.01),   // 1%
    cnpsWorkAccident:  Math.round(base * 0.017),  // 1.7% (variable by sector)
    rav:               Math.round(base * 0.015),  // 1.5% family benefits
    total:             Math.round(base * (0.042 + 0.01 + 0.017 + 0.015)),
  }
}
