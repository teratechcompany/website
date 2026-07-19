import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import Link              from 'next/link'
import dbConnect         from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'
import { Intern }        from '@/lib/db/models/Intern'
import { BlogPost }      from '@/lib/db/models/BlogPost'
import { Event }         from '@/lib/db/models/Event'
import { AlumniProfile } from '@/lib/db/models/AlumniProfile'
import { User }          from '@/lib/db/models/User'

export default async function AdminDashboard() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const [apps, interns, posts, events, pendingAlumni, users] = await Promise.all([
    Application.countDocuments({ status:{ $in:['submitted','screening','interview'] } }),
    Intern.countDocuments({ status:'active' }),
    BlogPost.countDocuments({ published:true }),
    Event.countDocuments({ published:true }),
    AlumniProfile.countDocuments({ approved:false }),
    User.countDocuments(),
  ])
  const KPIs = [
    { label:'Open Applications',  value:apps,           href:'/admin/applications', color:'var(--brand-blue)' },
    { label:'Active Interns',     value:interns,        href:'/internal/interns',   color:'var(--brand-cyan)' },
    { label:'Published Posts',    value:posts,          href:'/admin/cms',          color:'var(--white-muted)' },
    { label:'Events',             value:events,         href:'/admin/cms',          color:'var(--white-muted)' },
    { label:'Alumni to review',   value:pendingAlumni,  href:'/admin/alumni',       color:pendingAlumni>0?'var(--brand-orange)':'var(--white-muted)' },
    { label:'Total users',        value:users,          href:'/admin/users',        color:'var(--white-muted)' },
  ]
  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Admin Dashboard</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>Platform management centre</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--s16)', marginBottom:'var(--s48)' }}>
        {KPIs.map(k => (
          <Link key={k.label} href={k.href} style={{ textDecoration:'none' }}>
            <div className="card" style={{ padding:'var(--s24)', cursor:'pointer' }}>
              <p style={{ fontSize:40, fontWeight:200, color:k.color, letterSpacing:'-0.04em', lineHeight:1, marginBottom:'var(--s8)' }}>{k.value}</p>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>{k.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--s12)' }}>
        {[
          { label:'New blog post',  href:'/admin/cms/blog/new',  variant:'btn-blue'  },
          { label:'New event',      href:'/admin/cms/events/new',variant:'btn-blue'  },
          { label:'View audit log', href:'/admin/audit',         variant:'btn-ghost' },
        ].map(a => <Link key={a.href} href={a.href} className={`btn ${a.variant}`} style={{ justifyContent:'center' }}>{a.label}</Link>)}
      </div>
    </div>
  )
}
