'use client'

import { APP } from '@/constants/config'

/** Floating WhatsApp community button — orange rounded pill (brand shape) */
export function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${APP.whatsapp}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Join Tera-Tech WhatsApp community"
      style={{
        position: 'fixed', bottom: 'var(--s24)', right: 'var(--s24)', zIndex: 90,
        background: '#25D366',
        color: 'var(--white)',
        borderRadius: 'var(--radius-round)', // organic/rounded — orange family
        padding: '12px 18px',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 'var(--text-sm)', fontWeight: 500,
        boxShadow: '0 8px 32px rgba(37,211,102,0.3)',
        transition: 'transform var(--duration-base) var(--ease), box-shadow var(--duration-base) var(--ease)',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 12px 40px rgba(37,211,102,0.4)' }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.transform='translateY(0)'; el.style.boxShadow='0 8px 32px rgba(37,211,102,0.3)' }}
    >
      {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.7 12.7 0 00-.57-.01c-.198 0-.52.074-.792.372-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.12 1.524 5.854L0 24l6.335-1.498A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.788-.528-5.368-1.448l-.385-.228-3.982.941.975-3.886-.251-.398A9.957 9.957 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z"/>
      </svg> */}
          <img 
      src="/assets/icons/light_whatsapp.svg" 
      alt="WhatsApp" 
      width={18} 
      height={18} 
      aria-hidden="true"
      />


      <span>Join Community</span>
    </a>
  )
}
