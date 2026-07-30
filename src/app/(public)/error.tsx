'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected public errors to monitoring service
    console.error('Public route error caught:', error)
  }, [error])

  return (
    <div className="container route-error-container">
      <div className="route-error-badge" aria-hidden="true">
        !
      </div>
      <h1 className="route-error-title">Something went wrong</h1>
      <p className="route-error-text">
        We encountered an unexpected error while loading this page. Please try again or return home.
      </p>
      <div className="route-error-actions">
        <button type="button" onClick={() => reset()} className="btn btn-blue">
          Try again
        </button>
        <Link href={ROUTES.HOME} className="btn btn-ghost">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
