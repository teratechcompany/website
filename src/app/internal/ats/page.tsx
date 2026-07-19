import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import Link              from 'next/link'
import dbConnect         from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'

const COLUMNS = [
  { key:'submitted', label:'Submitted',  color:'var(--white-muted)' },
  { key:'screening', label:'Screening',  color:'var(--brand-blue)' },
  { key:'interview', label:'Interview',  color:'var(--brand-cyan)' },
  { key:'offered',   label:'Offered',    color:'var(--brand-orange)' },
  { key:'accepted',  label:'Accepted',   color:'var(--success)' },
]

export default async function ATSPage() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()

  const apps = await Application.find({ status:{ $in:['submitted','screening','interview','offered','accepted'] } })
    .sort({ createdAt:-1 })
    .select('personalInfo.name personalInfo.email track status createdAt submittedAt')
    .lean() as any[]

  const grouped = Object.fromEntries(COLUMNS.map(c => [c.key, apps.filter(a => a.status === c.key)]))

  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>ATS Pipeline</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>
        {apps.length} active applications across {COLUMNS.length} stages
      </p>

      {/* Kanban */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'var(--s12)', overflowX:'auto', paddingBottom:'var(--s16)' }}>
        {COLUMNS.map(col => (
          <div key={col.key}>
            {/* Column header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'var(--s10) var(--s12)', marginBottom:'var(--s12)', background:'var(--black-surface)', borderRadius:'var(--radius-sharp)', border:'1px solid var(--white-faint)' }}>
              <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:col.color }}>{col.label}</p>
              <span style={{ fontSize:12, fontWeight:600, color:col.color, background:'var(--white-faint)', padding:'2px 8px', borderRadius:'99px' }}>{grouped[col.key]?.length ?? 0}</span>
            </div>

            {/* Cards */}
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--s8)' }}>
              {(grouped[col.key] ?? []).map((app:any) => (
                <Link key={app._id} href={`/internal/ats/${app._id}`} style={{ textDecoration:'none' }}>
                  <div style={{ background:'var(--black-elevated)', border:'1px solid var(--white-faint)', borderRadius:'var(--radius-sharp)', padding:'var(--s12)', cursor:'pointer', transition:'border-color 0.2s, transform 0.2s' }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--brand-blue-border)';(e.currentTarget as HTMLElement).style.transform='translateY(-1px)'}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--white-faint)';(e.currentTarget as HTMLElement).style.transform='translateY(0)'}}>
                    <p style={{ fontSize:'var(--text-sm)', fontWeight:500, color:'var(--white)', marginBottom:4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{app.personalInfo?.name ?? 'Unknown'}</p>
                    <p style={{ fontSize:11, color:'var(--white-muted)', textTransform:'capitalize', marginBottom:4 }}>{app.track}</p>
                    <p style={{ fontSize:10, color:'var(--white-subtle)' }}>{new Date(app.submittedAt ?? app.createdAt).toLocaleDateString('en-CM',{ dateStyle:'short' })}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
