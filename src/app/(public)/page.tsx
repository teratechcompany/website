import type { Metadata } from 'next'
import { HeroSection }         from '@/components/sections/home/HeroSection'
import { MetricsSection }      from '@/components/sections/home/MetricsSection'
import { SpecialtiesSection }  from '@/components/sections/home/SpecialtiesSection'
import { TimelineSection }     from '@/components/sections/home/TimelineSection'
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection'
import { LeadSection }         from '@/components/sections/home/LeadSection'
import { APP } from '@/constants/config'

export const metadata: Metadata = {
  title:       `${APP.name} — ${APP.tagline}`,
  description: APP.description,
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MetricsSection />
      <SpecialtiesSection />
      <TimelineSection />
      <TestimonialsSection />
      <LeadSection />
    </>
  )
}
