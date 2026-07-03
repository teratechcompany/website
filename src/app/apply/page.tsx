import type { Metadata } from 'next'
import { ApplicationForm } from '@/components/forms/ApplicationForm'
export const metadata: Metadata = { title:'Apply — Tera-Tech Internship' }
export default function ApplyPage() {
  return <ApplicationForm />
}
