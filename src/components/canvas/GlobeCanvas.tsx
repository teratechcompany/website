'use client'
import { useEffect, useRef } from 'react'
import { BRAND } from '@/constants/brand'

/** 2D canvas globe — spherical coordinate dot lattice + arc connections */
export function GlobeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr  = Math.min(window.devicePixelRatio ?? 1, 2)
    const size = canvas.parentElement!.offsetWidth
    canvas.width  = size * dpr
    canvas.height = size * dpr
    canvas.style.width  = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const R  = size * 0.42
    const cx = size / 2
    const cy = size / 2
    const ROWS = 26

    // Dot lattice
    const dots: { phi: number; theta: number }[] = []
    for (let i = 0; i <= ROWS; i++) {
      const phi = (Math.PI * i) / ROWS
      const n   = Math.max(1, Math.round(38 * Math.sin(phi)))
      for (let j = 0; j < n; j++)
        dots.push({ phi, theta: (2 * Math.PI * j) / n })
    }

    // Arc connections (Bamenda → global hubs)
    const ARCS = [
      { lat1: 5.9, lon1: 10.2, lat2: 51.5, lon2: -0.1  },  // London
      { lat1: 5.9, lon1: 10.2, lat2: 48.9, lon2:  2.3  },  // Paris
      { lat1: 5.9, lon1: 10.2, lat2: 37.8, lon2:-122.4 },  // SF
      { lat1: 5.9, lon1: 10.2, lat2: -1.3, lon2: 36.8  },  // Nairobi
      { lat1: 5.9, lon1: 10.2, lat2: 24.5, lon2: 54.4  },  // Abu Dhabi
    ]

    const llTo3D = (lat: number, lon: number, r: number) => {
      const phi   = (90 - lat) * Math.PI / 180
      const theta = lon * Math.PI / 180
      return { x: r*Math.sin(phi)*Math.cos(theta), y: r*Math.cos(phi), z: r*Math.sin(phi)*Math.sin(theta) }
    }

    let angle = 0
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, size, size)
      const cosA = Math.cos(angle), sinA = Math.sin(angle)
      const rotY  = (p: { x:number;y:number;z:number }) =>
        ({ x: p.x*cosA - p.z*sinA, y: p.y, z: p.x*sinA + p.z*cosA })

      // Dots
      for (const { phi, theta } of dots) {
        const x0 = R*Math.sin(phi)*Math.cos(theta)
        const y0 = R*Math.cos(phi)
        const z0 = R*Math.sin(phi)*Math.sin(theta)
        const rx  = x0*cosA - z0*sinA
        const rz  = x0*sinA + z0*cosA
        if (rz < -R*0.05) continue
        const alpha = 0.18 + 0.45*((rz + R)/(2*R))
        ctx.beginPath()
        ctx.arc(cx + rx, cy - y0, 1.6, 0, Math.PI*2)
        ctx.fillStyle = `rgba(0,114,206,${alpha})` // Pantone 285C
        ctx.fill()
      }

      // Arcs
      const now = Date.now() * 0.001
      for (let i = 0; i < ARCS.length; i++) {
        const { lat1,lon1,lat2,lon2 } = ARCS[i]!
        const r1 = rotY(llTo3D(lat1,lon1,R))
        const r2 = rotY(llTo3D(lat2,lon2,R))
        const t  = (now + i*0.8) % 2
        const STEPS = 44
        let prev: { x:number;y:number } | null = null

        for (let s = 0; s <= STEPS; s++) {
          const f = s/STEPS
          const h = Math.sin(f*Math.PI)*R*0.28
          const ix = r1.x + (r2.x-r1.x)*f
          const iy = r1.y + (r2.y-r1.y)*f
          const iz = r1.z + (r2.z-r1.z)*f
          const len = Math.sqrt(ix*ix+iy*iy+iz*iz)
          if (len === 0) continue
          const mx  = (R+h)*ix/len
          const my  = (R+h)*iy/len
          const mz  = (R+h)*iz/len
          const sx  = cx+mx, sy = cy-my
          if (mz < 0 || !prev) { prev = { x:sx, y:sy }; continue }
          const dist = Math.abs(f - (t % 1))
          const alpha = Math.max(0, 0.9 - dist*2.8)
          if (alpha > 0.02) {
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(sx, sy)
            ctx.strokeStyle = `rgba(255,105,0,${alpha})` // Pantone 1505C orange
            ctx.lineWidth   = 1.8
            ctx.stroke()
          }
          prev = { x:sx, y:sy }
        }
      }

      // Bamenda home dot
      const home = rotY(llTo3D(5.9, 10.2, R))
      ctx.beginPath()
      ctx.arc(cx + home.x, cy - home.y, 5, 0, Math.PI*2)
      ctx.fillStyle   = BRAND.orange
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx + home.x, cy - home.y, 9, 0, Math.PI*2)
      ctx.strokeStyle = `rgba(255,105,0,0.3)`
      ctx.lineWidth   = 2
      ctx.stroke()

      angle += 0.0025
      raf    = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={ref}
      aria-label="Interactive globe showing Tera-Tech's connection from Bamenda to global partner hubs"
      style={{ width: '100%', height: '100%', borderRadius: '50%' }}
    />
  )
}
