import { ImageResponse } from 'next/og'
import { APP } from '@/constants/config'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? APP.name
  const sub   = searchParams.get('sub')   ?? APP.tagline

  return new ImageResponse(
    (
      <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'64px', background:'#0A0A0A', position:'relative', fontFamily:'system-ui,sans-serif' }}>
        {/* Blue bar top */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:6, background:'#0072CE' }} />

        {/* Logo mark */}
        <div style={{ position:'absolute', top:48, left:64, display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:32, height:32, background:'#0072CE', borderRadius:4 }} />
          <p style={{ color:'#F5F5F5', fontSize:18, fontWeight:700, letterSpacing:'-0.5px' }}>TERA-TECH.</p>
        </div>

        {/* Title */}
        <h1 style={{ fontSize:64, fontWeight:300, color:'#F5F5F5', lineHeight:1.05, letterSpacing:'-2px', margin:0, marginBottom:16, maxWidth:900 }}>
          {title}
        </h1>
        <p style={{ fontSize:24, color:'rgba(245,245,245,0.55)', margin:0 }}>{sub}</p>
      </div>
    ),
    { width:1200, height:630 }
  )
}
