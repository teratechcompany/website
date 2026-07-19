/**
 * Portfolio projects — edit this file to add, remove or update projects.
 * category: 'internal' | 'client' | 'r&d'
 * status:   'live' | 'beta' | 'development' | 'concept'
 */
export type ProjectCategory = 'internal' | 'client' | 'r&d'
export type ProjectStatus   = 'live' | 'beta' | 'development' | 'concept'

export interface PortfolioProject {
  id:          string
  name:        string
  tagline:     string
  description: string
  category:    ProjectCategory
  status:      ProjectStatus
  tech:        string[]
  features:    string[]
  image?:      string     // /assets/portfolio/<file>
  liveUrl?:    string
  repoUrl?:    string
  featured:    boolean
}

export const PROJECTS: PortfolioProject[] = [
  {
    id:       'pesal',
    name:     'PesaL',
    tagline:  'Intelligent Company Finance Management',
    description: 'PesaL is a comprehensive financial management platform designed for SMEs and growing businesses in Cameroon and the wider African market. It provides real-time visibility into income, expenses, cash flow, and financial health through an intuitive dashboard. PesaL supports multi-currency operations, invoice generation, budget tracking, tax reporting, and integrates natively with MTN MoMo and Orange Money for seamless local payment workflows.',
    category: 'internal',
    status:   'beta',
    tech:     ['Next.js', 'Node.js', 'MongoDB', 'MTN MoMo API', 'Orange Money API', 'Zod', 'Resend'],
    features: ['Real-time cash flow dashboard', 'Invoice creation & tracking', 'Multi-currency support', 'MTN MoMo & Orange Money integration', 'Tax report generation', 'Budget vs actuals analysis', 'Expense categorisation'],
    featured: true,
  },
  {
    id:       'staffa',
    name:     'Staffa',
    tagline:  'Modern HR Management for African Teams',
    description: 'Staffa is a full-featured human resources management system purpose-built for the Cameroonian and African employment context. It digitises the entire HR lifecycle — from recruitment and onboarding to performance management, leave administration, and offboarding. Staffa includes contract generation, document management, a self-service employee portal, and role-based access for HR administrators, managers, and staff.',
    category: 'internal',
    status:   'development',
    tech:     ['Next.js', 'MongoDB', 'NextAuth', 'Cloudinary', 'Resend', 'TypeScript'],
    features: ['Employee records management', 'Contract & document generation', 'Leave request & approval workflow', 'Performance review system', 'Onboarding checklists', 'Self-service employee portal', 'Role-based access control'],
    featured: true,
  },
  {
    id:       'scool',
    name:     'Scool',
    tagline:  'The Academic Operating System for Schools',
    description: 'Scool is an all-in-one academic management platform designed for primary and secondary schools, colleges, and universities across Cameroon. It centralises student admissions, class scheduling, grade management, attendance tracking, and parent communication into a single bilingual (English/French) platform. Scool aligns with the LMD grading system and GCE/BEPC examination structures, making it purpose-fit for the Cameroonian curriculum.',
    category: 'client',
    status:   'live',
    tech:     ['Laravel', 'PostgreSQL', 'Livewire', 'Alpine.js', 'Tailwind', 'Supabase'],
    features: ['Student admissions & matriculation', 'Timetable & scheduling engine', 'Grade book with LMD support', 'Attendance tracking', 'Parent & guardian portal', 'Bilingual EN/FR interface', 'GCE/BEPC result management'],
    featured: true,
  },
  {
    id:       'padi',
    name:     'Padi',
    tagline:  'Your Personalised AI Study Companion',
    description: 'Padi is an intelligent mobile study application that adapts to each student\'s unique learning pace, gaps, and goals. Using spaced repetition, adaptive quizzing, and AI-generated revision guides, Padi helps students studying for GCE, BEPC, professional certifications, and university examinations study smarter, not harder. The app tracks progress, identifies weak areas, and generates personalised study plans that evolve as the student improves.',
    category: 'r&d',
    status:   'development',
    tech:     ['Flutter', 'Dart', 'Firebase', 'Python', 'FastAPI', 'TensorFlow Lite'],
    features: ['Adaptive spaced repetition engine', 'AI-generated revision summaries', 'Subject-specific question banks', 'Progress analytics & weak area detection', 'Offline-first study mode', 'Personalised daily study plans', 'GCE & BEPC curriculum alignment'],
    featured: false,
  },
  {
    id:       'payal',
    name:     'Payal',
    tagline:  'Payroll Management Built for Cameroon',
    description: 'Payal is a payroll management system designed around the Cameroonian employment law and tax framework. It automates salary computation, CNPS social security deductions, income tax calculations, and payslip generation. Payal integrates directly with MTN MoMo for bulk salary disbursement and produces all regulatory documentation required for labour inspections and annual filings.',
    category: 'internal',
    status:   'beta',
    tech:     ['Next.js', 'Node.js', 'MongoDB', 'MTN MoMo API', 'Sharp', 'Resend'],
    features: ['Automated salary computation', 'CNPS & tax deduction engine', 'Bulk MTN MoMo disbursement', 'Payslip PDF generation', 'Regulatory compliance reports', 'Multi-period payroll runs', 'Audit trail & approval workflow'],
    featured: true,
  },
  {
    id:       'sika',
    name:     'Sika',
    tagline:  'End-to-End Internship Programme Management',
    description: 'Sika is the operational backbone of the Tera-Tech internship programme — and the product this very platform runs on. It manages the complete intern lifecycle from application submission and ATS pipeline management, through offer issuance and onboarding, to performance tracking and alumni conversion. Sika provides internal HR tools, an applicant-facing portal, a cohort management dashboard, and automated communications throughout.',
    category: 'internal',
    status:   'live',
    tech:     ['Next.js 14', 'MongoDB', 'NextAuth', 'Resend', 'Cloudinary', 'TypeScript', 'Zod'],
    features: ['Multi-step application portal', 'ATS pipeline with Kanban view', 'Automated status email notifications', 'Offer letter generation & acceptance', 'Intern onboarding checklist', 'Performance review system', 'Alumni profile auto-conversion'],
    featured: true,
  },
]

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  'internal': 'Internal Product',
  'client':   'Client Product',
  'r&d':      'R&D Project',
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  'live':        'Live',
  'beta':        'Beta',
  'development': 'In Development',
  'concept':     'Concept',
}
