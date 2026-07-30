import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/sections/shared/WhatsAppFAB'
import { AnnouncementBanner } from '@/components/sections/shared/AnnouncementBanner'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main className="public-main">{children}</main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
