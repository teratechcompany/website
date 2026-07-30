export interface MockBlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: {
    name: string
    role: string
    avatarUrl?: string
  }
  publishedAt: string
  readTime: string
  imageUrl?: string
  featured?: boolean
}

export interface MockPortfolioProject {
  id: string
  slug: string
  title: string
  category: string
  summary: string
  description: string
  client: string
  impact: string
  tags: string[]
  imageUrl?: string
  featured?: boolean
}

export interface MockAnnouncement {
  id: string
  title: string
  content: string
  linkText?: string
  linkUrl?: string
  startsAt?: string
  endsAt?: string
  active: boolean
}

export interface MockTeamMember {
  id: string
  name: string
  role: string
  bio: string
  imageUrl?: string
  linkedin?: string
  twitter?: string
  github?: string
  featured?: boolean
}

export const mockAnnouncements: MockAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Cohort 2026 Tech Internship Applications Open!',
    content: 'Empowering top Cameroonian tech talent with hands-on systems engineering experience.',
    linkText: 'Apply Now',
    linkUrl: '/apply',
    active: true,
  },
]

export const mockBlogPosts: MockBlogPost[] = [
  {
    id: 'post-1',
    slug: 'scaling-systems-innovation-in-cameroon',
    title: 'Scaling Systems Innovation: Empowering Cameroon’s Next Gen Tech Leaders',
    excerpt: 'How Tera-Tech bridges the gap between regional software engineering talent and high-impact global projects.',
    content: 'Cameroon has become a thriving hub for software architecture, systems engineering, and technological enterprise. At Tera-Tech, our mission is to build robust software pipelines...',
    category: 'Engineering & Innovation',
    author: {
      name: 'Nguene Kevin',
      role: 'Head of Technology',
    },
    publishedAt: '2026-07-15',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 'post-2',
    slug: 'building-resilient-microservices-nextjs-mongoose',
    title: 'Building Resilient Platform Architectures with Next.js 14 & Mongoose',
    excerpt: 'Best practices for architecting decoupled, production-grade applications with full-stack TypeScript.',
    content: 'Full-stack development demands strong dynamic boundaries, schema validation with Zod, and clear client-server separation...',
    category: 'Technical Deep-Dive',
    author: {
      name: 'Tera Engineering Team',
      role: 'Core Platform Team',
    },
    publishedAt: '2026-07-02',
    readTime: '8 min read',
    featured: false,
  },
]

export const mockPortfolioProjects: MockPortfolioProject[] = [
  {
    id: 'proj-1',
    slug: 'agri-connect-cameroon',
    title: 'AgriConnect Digital Supply Chain Platform',
    category: 'AgTech / Enterprise Systems',
    summary: 'Centralized digital marketplace connecting local agricultural producers to regional distributors.',
    description: 'Developed an offline-first mobile and web application suite providing real-time pricing, batch tracking, and direct payment integrations.',
    client: 'Regional Agribusiness Alliance',
    impact: 'Increased farmer profit margins by 35% across 4 regions in Cameroon.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'PWA'],
    featured: true,
  },
  {
    id: 'proj-2',
    slug: 'fintech-remittance-gateway',
    title: 'Fintech Micro-Remittance Settlement Hub',
    category: 'FinTech',
    summary: 'High-throughput payment orchestration engine for cross-border transactions.',
    description: 'Built a compliant, low-latency API gateway handling thousands of daily transactions across Central Africa.',
    client: 'Pan-African Financial Services',
    impact: 'Reduced transaction processing times from 4 hours to 3 seconds.',
    tags: ['TypeScript', 'Security', 'Mongoose', 'API Gateway'],
    featured: true,
  },
]

export const mockTeamMembers: MockTeamMember[] = [
  {
    id: 'team-1',
    name: 'Kevin Nguene',
    role: 'Founder & Managing Director',
    bio: 'Systems architect passionate about unlocking technology talent across Central Africa.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: 'team-2',
    name: 'Sarah Mbock',
    role: 'Lead Frontend Architect',
    bio: 'Specialist in modern web platform designs, web accessibility, and interactive design systems.',
    linkedin: 'https://linkedin.com',
    featured: true,
  },
]
