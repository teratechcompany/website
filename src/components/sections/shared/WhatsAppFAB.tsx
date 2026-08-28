'use client'

import { APP } from '@/constants/config'
import styles from './WhatsAppFAB.module.css'

/** Floating WhatsApp community button — orange rounded pill (brand shape) */
export function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${APP.whatsapp}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Join Tera-Tech WhatsApp community"
      className={styles.fab}
    >
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
