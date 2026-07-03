'use client'
import { Input }  from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { FormData } from './index'

interface Props { data:FormData; onChange:(p:Partial<FormData>)=>void; onNext:()=>void; onBack:()=>void }

export function Step4Documents({ data, onChange, onNext, onBack }: Props) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'var(--s20)' }}>
      <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s4)' }}>Documents</h2>
      <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s12)' }}>Both fields are optional but strongly recommended. Link to publicly accessible files (Google Drive, Dropbox, etc.).</p>

      <Input id="cvUrl" type="url" label="CV / Resume URL" value={data.cvUrl ?? ''} onChange={e=>onChange({ cvUrl:e.target.value||undefined })} placeholder="https://drive.google.com/..." hint="Direct link to your CV (PDF preferred)" />
      <Input id="portfolioUrl" type="url" label="Portfolio / GitHub URL" value={data.portfolioUrl ?? ''} onChange={e=>onChange({ portfolioUrl:e.target.value||undefined })} placeholder="https://github.com/yourusername" hint="Projects, work samples, or GitHub profile" />

      <div className="card-flat" style={{ borderLeft:'3px solid var(--brand-blue)', borderRadius:0, marginTop:'var(--s8)' }}>
        <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>
          Make sure your links are set to <strong style={{ color:'var(--white)' }}>publicly viewable</strong> before submitting.
        </p>
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'var(--s8)' }}>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <Button variant="blue"  onClick={onNext}>Review application →</Button>
      </div>
    </div>
  )
}
