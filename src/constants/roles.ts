export const ROLES = {
  APPLICANT: 'applicant',
  INTERN:    'intern',
  VOLUNTEER: 'volunteer',
  STAFF:     'staff',
  HR_ADMIN:  'hr_admin',
  ADMIN:     'admin',
} as const
export type Role = typeof ROLES[keyof typeof ROLES]

export const ROLE_LABELS: Record<Role, string> = {
  applicant: 'Applicant',
  intern:    'Intern',
  volunteer: 'Volunteer',
  staff:     'Staff',
  hr_admin:  'HR Admin',
  admin:     'Administrator',
}
