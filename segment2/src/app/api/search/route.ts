import { NextResponse }  from 'next/server'
import dbConnect         from '@/lib/db/mongoose'
import { BlogPost }      from '@/lib/db/models/BlogPost'
import { Event }         from '@/lib/db/models/Event'
import { AlumniProfile } from '@/lib/db/models/AlumniProfile'
import { CareerPost }    from '@/lib/db/models/CareerPost'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim().slice(0, 100)
  if (!q || q.length < 2) return NextResponse.json({ results:[] })

  await dbConnect()
  const rx = new RegExp(q, 'i')

  const [blog, events, alumni, careers] = await Promise.all([
    BlogPost.find    ({ published:true, $or:[{title:rx},{excerpt:rx},{tags:rx}] }).limit(5).select('title slug excerpt').lean(),
    Event.find       ({ published:true, $or:[{title:rx},{description:rx}] }).limit(5).select('title slug description type date').lean(),
    AlumniProfile.find({ approved:true, $or:[{name:rx},{company:rx},{role:rx}] }).limit(5).select('name slug company role track').lean(),
    CareerPost.find  ({ active:true,    $or:[{title:rx},{department:rx}] }).limit(5).select('title slug department type').lean(),
  ])

  return NextResponse.json({
    results:[
      ...blog.map   (r => ({ ...r, _type:'blog'    })),
      ...events.map (r => ({ ...r, _type:'event'   })),
      ...alumni.map (r => ({ ...r, _type:'alumni'  })),
      ...careers.map(r => ({ ...r, _type:'career'  })),
    ]
  })
}
