export const APP = {
  name:        'Tera-Tech Ltd',
  tagline:     'Launch Your Tech Career From Day One',
  description: 'Systems innovation company connecting Cameroonian tech talent to regional and global opportunities.',
  url:         process.env.NEXTAUTH_URL ?? 'https://teratechcompany.tech',
  email:       'contact@teratechcompany.tech',
  phone:       '+237 678 937 645',
  address:     'Sonac Street, Bamenda, North West Region, Cameroon',
  whatsapp:    '237678937645',
  founded:     2018,
  socials: {
    linkedin:  'https://linkedin.com/company/tera-tech-ltd',
    twitter:   'https://twitter.com/teratechcm',
    github:    'https://github.com/teratechcompany',
  },
  stats: {
    interns:   '120+',
    partners:  '40+',
    hireRate:  '95%',
    tracks:    8,
  },
} as const

export const PAGINATION = { DEFAULT: 12, BLOG: 9, ALUMNI: 16 } as const
