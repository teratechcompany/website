import { requireRole } from '@/lib/auth/guards'
import { ROLES }       from '@/constants/roles'

const TEMPLATES = [
  { id:'applicationReceived', label:'Application received',     desc:'Sent immediately when an applicant submits their application.' },
  { id:'statusUpdate',        label:'Status update',            desc:'Sent when the ATS status changes (screening, interview, offer, etc.).' },
  { id:'offerIssued',         label:'Offer issued',             desc:'Sent when an offer is marked as issued in the portal.' },
  { id:'welcome',             label:'Welcome / account created',desc:'Sent after a new user registers an account.' },
]

export default async function EmailPage() {
  await requireRole(ROLES.ADMIN)
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 'var(--s8)' }}>Email Templates</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>Transactional emails sent automatically by the platform</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s12)', marginBottom: 'var(--s32)' }}>
        {TEMPLATES.map(t => (
          <div key={t.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--s16)' }}>
            <div>
              <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)', color: 'var(--white)', marginBottom: 4 }}>{t.label}</p>
              <p style={{ fontSize: 12, color: 'var(--white-muted)' }}>{t.desc}</p>
              <p style={{ fontSize: 11, color: 'var(--white-subtle)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>src/lib/email/templates/{t.id}.ts</p>
            </div>
            <span className="badge badge-green" style={{ fontSize: 10, flexShrink: 0 }}>Active</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 'var(--s24)', borderLeft: '3px solid var(--brand-blue)', borderRadius: 0, borderTopRightRadius: 'var(--radius-soft)', borderBottomRightRadius: 'var(--radius-soft)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', lineHeight: 1.65 }}>
          Email templates are defined in <code style={{ fontSize: 11, color: 'var(--brand-cyan)', background: 'var(--black-elevated)', padding: '2px 6px', borderRadius: 'var(--radius-sharp)' }}>src/lib/email/templates/</code>. To edit copy or layout, update the file and redeploy. All emails are sent via <strong style={{ color: 'var(--white)' }}>Resend</strong> from <strong style={{ color: 'var(--white)' }}>contact@teratechcompany.tech</strong>.
        </p>
      </div>
    </div>
  )
}
