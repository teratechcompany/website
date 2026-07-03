import { Navbar }      from '@/components/layout/Navbar'
import { Footer }      from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/sections/shared/WhatsAppFAB'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>{children}</main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
