type Entry = { count: number; reset: number }
const store = new Map<string, Entry>()

export function rateLimit(
  key: string,
  max = Number(process.env.RATE_LIMIT_MAX ?? 100),
  windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000)
): { ok: boolean; remaining: number; reset: number } {
  const now = Date.now()
  const e   = store.get(key)
  if (!e || now > e.reset) {
    const reset = now + windowMs
    store.set(key, { count: 1, reset })
    return { ok: true, remaining: max - 1, reset }
  }
  e.count++
  return { ok: e.count <= max, remaining: Math.max(0, max - e.count), reset: e.reset }
}
