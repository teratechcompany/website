'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockAnnouncements } from '@/mocks/cmsData'

const DISMISSAL_KEY = 'announcement_dismissed'

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const isDismissed = localStorage.getItem(DISMISSAL_KEY) === 'true'
    setDismissed(isDismissed)
  }, [])

  const activeAnnouncement = mockAnnouncements.find((ann) => {
    if (!ann.active) return false
    const now = new Date()
    if (ann.startsAt && new Date(ann.startsAt) > now) return false
    if (ann.endsAt && new Date(ann.endsAt) < now) return false
    return true
  })

  if (dismissed || !activeAnnouncement) {
    return null
  }

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem(DISMISSAL_KEY, 'true')
  }

  return (
    <aside className="announcement-banner" aria-label="Announcement">
      <div className="announcement-inner">
        <div className="announcement-content">
          <span className="announcement-badge">Notice</span>
          <span className="announcement-text">
            <strong>{activeAnnouncement.title}</strong> {activeAnnouncement.content}
          </span>
          {activeAnnouncement.linkText && activeAnnouncement.linkUrl && (
            <Link href={activeAnnouncement.linkUrl} className="announcement-link">
              {activeAnnouncement.linkText} →
            </Link>
          )}
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="announcement-close"
          aria-label="Dismiss announcement"
        >
          ✕
        </button>
      </div>
    </aside>
  )
}
