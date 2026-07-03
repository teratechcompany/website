export const formatDate = (d: Date | string, locale = 'en-CM') =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(d))

export const formatCurrency = (n: number, currency = 'XAF') =>
  new Intl.NumberFormat('fr-CM', { style: 'currency', currency, minimumFractionDigits: 0 }).format(n)

export const truncate = (s: string, n = 140) =>
  s.length > n ? `${s.slice(0, n)}…` : s

export const toInitials = (name: string) =>
  name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
