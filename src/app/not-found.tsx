import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export default function NotFound() {
  return (
    <main className="container not-found-container">
      <div className="not-found-badge">404</div>
      <h1 className="not-found-title">Page not found</h1>
      <p className="not-found-text">
        The page you are looking for does not exist, has been moved, or is temporarily unavailable.
      </p>
      <div className="not-found-actions">
        <Link href={ROUTES.HOME} className="btn btn-blue">
          Back home
        </Link>
        <Link href={ROUTES.APPLY} className="btn btn-orange">
          Apply now
        </Link>
      </div>
    </main>
  )
}
