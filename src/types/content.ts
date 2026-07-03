import type { TrackId } from '@/constants/tracks'

export interface BlogPost {
  _id:          string
  title:        string
  slug:         string
  excerpt:      string
  content:      string
  author:       string
  publishedAt:  string
  tags:         string[]
  coverImage?:  string
  readTime?:    number
}

export interface Event {
  _id:         string
  title:       string
  slug:        string
  description: string
  type:        'upcoming' | 'past'
  date:        string
  location:    string
  reportUrl?:  string
  coverImage?: string
  capacity?:   number
}

export interface AlumniProfile {
  _id:       string
  name:      string
  slug:      string
  track:     TrackId
  cohort:    number
  company:   string
  role:      string
  quote:     string
  avatar?:   string
  approved:  boolean
  linkedIn?: string
}

export interface TeamMember {
  _id:      string
  name:     string
  role:     string
  bio:      string
  avatar?:  string
  order:    number
  type:     'staff' | 'volunteer'
  linkedIn?: string
}

export interface PortfolioItem {
  _id:         string
  title:       string
  description: string
  tech:        string[]
  imageUrl?:   string
  liveUrl?:    string
  repoUrl?:    string
  featured:    boolean
}
