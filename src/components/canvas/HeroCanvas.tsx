'use client'
import { useEffect, useRef } from 'react'
import { BRAND_GL } from '@/constants/brand'

/** GPU-accelerated WebGL mesh gradient — Tera-Tech brand colors */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, `attribute vec2 a; void main(){ gl_Position=vec4(a,0,1); }`)
    gl.compileShader(vs)

    // Fragment shader: slow fluid mesh shifting between brand colors
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, `
      precision mediump float;
      uniform float u_t;
      uniform vec2  u_res;
      void main(){
        vec2 st  = gl_FragCoord.xy / u_res;
        float t  = u_t * 0.025;
        st.x    += sin(st.y * 2.8 + t) * 0.10;
        st.y    += cos(st.x * 2.2 + t) * 0.08;
        /* Pantone 285C blue, near-black, Pantone 3125C cyan */
        vec3 c1 = vec3(${BRAND_GL.blue.join(',')});
        vec3 c2 = vec3(${BRAND_GL.black.join(',')});
        vec3 c3 = vec3(${BRAND_GL.navy.join(',')});
        vec3 c4 = vec3(${BRAND_GL.cyan.join(',')});
        vec3 col = mix(c2, c1, smoothstep(0.0, 0.6, st.x));
        col      = mix(col, c3, smoothstep(0.4, 1.0, st.y));
        col      = mix(col, c4 * 0.35, smoothstep(0.7, 1.0, st.x) * smoothstep(0.0, 0.3, st.y));
        gl_FragColor = vec4(col, 1.0);
      }
    `)
    gl.compileShader(fs)

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs); gl.attachShader(prog, fs)
    gl.linkProgram(prog); gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    const pos  = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uT   = gl.getUniformLocation(prog, 'u_t')
    const uRes = gl.getUniformLocation(prog, 'u_res')
    const t0   = performance.now()
    let raf: number

    const draw = () => {
      gl.uniform1f(uT,  (performance.now() - t0) * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}
