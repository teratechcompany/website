import { requireRole } from '@/lib/auth/guards'
import { ROLES }       from '@/constants/roles'
import { APP }         from '@/constants/config'

export default async function SettingsPage() {
  await requireRole(ROLES.ADMIN)
  const integrations = {
    resend:     !!process.env.RESEND_API_KEY,
    cloudinary: !!process.env.CLOUDINARY_API_KEY,
    mongodb:    !!process.env.MONGODB_URI,
    nextauth:   !!process.env.NEXTAUTH_SECRET,
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 'var(--s8)' }}>Settings</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>Platform configuration and integration status</p>

      {/* Integration health */}
      <div className="card" style={{ marginBottom: 'var(--s32)', padding: 'var(--s32)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: 'var(--s20)' }}>Integration health</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s12)' }}>
          {Object.entries(integrations).map(([key, ok]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-dim)', textTransform: 'capitalize' }}>{key.replace('_', ' ')}</p>
              <span className={`badge ${ok ? 'badge-green' : 'badge-red'}`} style={{ fontSize: 11 }}>{ok ? 'Configured' : 'Missing'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* App info */}
      <div className="card" style={{ padding: 'var(--s32)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: 'var(--s20)' }}>Application info</p>
        {[
          ['Company name', APP.name],
          ['Contact email', APP.email],
          ['Phone', APP.phone],
          ['Address', APP.address],
          ['Founded', String(APP.founded)],
          ['Platform URL', APP.url],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 'var(--s16)', paddingBottom: 'var(--s12)', borderBottom: '1px solid var(--white-faint)', marginBottom: 'var(--s12)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--white-muted)', minWidth: 140, flexShrink: 0 }}>{k}</p>
            <p style={{ fontSize: 12, color: 'var(--white-dim)', fontFamily: k === 'Platform URL' ? 'var(--font-mono)' : undefined }}>{v}</p>
          </div>
        ))}
        <p style={{ fontSize: 12, color: 'var(--white-subtle)', marginTop: 'var(--s16)' }}>
          To update company information, edit <code style={{ fontSize: 11, color: 'var(--brand-cyan)', background: 'var(--black-elevated)', padding: '2px 6px', borderRadius: 'var(--radius-sharp)' }}>src/constants/config.ts</code>
        </p>
      </div>
    </div>
  )
}
