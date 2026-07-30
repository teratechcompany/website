/**
 * Team data — edit this file to update team members, socials, bios.
 * Social fields are all optional — only include what the person has.
 * avatar: place images in /public/assets/team/<filename>
 */
export interface Social {
  linkedin?: string
  twitter?:  string
  website?:  string
  github?:   string
  instagram?:string
}

export interface TeamMemberData {
  id:          string
  name:        string
  title:       string
  role:        string          // short label shown on card
  bio:         string
  avatar:      string          // /assets/team/<file> — use placeholder if not set
  type:        'staff' | 'volunteer'
  order:       number
  socials:     Social
}

export const TEAM: TeamMemberData[] = [
  {
    id:     'tita-tera',
    name:   'Sir Tita Tera',
    title:  'Founder & Managing Director',
    role:   'Founder & CEO',
    bio:    'Visionary technologist and entrepreneur who founded Tera-Tech Ltd in 2018 with a mission to bridge the gap between academic learning and production-level engineering in Cameroon. Sir Tita Tera leads the company\'s strategy, partnerships, and long-term direction, driving the placement of over 120 engineers across 40+ regional and global partners.',
    avatar: '/assets/team/tita-tera.png',
    type:   'staff',
    order:  1,
    socials: {
      linkedin: 'https://linkedin.com/in/tita-tera',
      twitter:  'https://twitter.com/titaterra',
      website:  'https://teratechcompany.tech',
    },
  },
  {
    id:     'nde-alban',
    name:   'Engr. Nde Alban',
    title:  'Chief Technology Officer & QA Lead',
    role:   'CTO & QA Lead',
    bio:    'Systems architect and quality assurance authority responsible for all technical standards at Tera-Tech. Engr. Nde Alban oversees the engineering stack, production deployments, code review pipelines, and ensures every project shipped meets the firm\'s quality bar before it reaches clients or end users.',
    avatar: '/assets/team/nde-alban.png',
    type:   'staff',
    order:  2,
    socials: {
      linkedin: 'https://linkedin.com/in/nde-alban',
      github:   'https://github.com/ndealban',
    },
  },
  {
    id:     'foncho-afanwi',
    name:   'Engr. Foncho Afanwi',
    title:  'Backend Engineering Lead',
    role:   'Backend Lead',
    bio:    'Expert backend engineer specialising in API architecture, database design, and distributed systems. Engr. Foncho Afanwi leads the backend engineering team, mentors backend-track interns, and is responsible for the reliability, performance, and security of all server-side systems at Tera-Tech.',
    avatar: '/assets/team/foncho-afanwi.png',
    type:   'staff',
    order:  3,
    socials: {
      linkedin: 'https://linkedin.com/in/foncho-afanwi',
      github:   'https://github.com/fonchoafanwi',
    },
  },
  {
    id:     'faye-rauda',
    name:   'Engr. Faye Rauda',
    title:  'Project Manager & Head of HR',
    role:   'Project Manager & HR',
    bio:    'Dual-role leader combining rigorous project delivery with people operations. Engr. Faye Rauda manages the internship programme lifecycle, coordinates sprint schedules, tracks deliverables across all active projects, and oversees onboarding, performance reviews, and wellbeing for the Tera-Tech team and intern cohorts.',
    avatar: '/assets/team/faye-rauda.png',
    type:   'staff',
    order:  4,
    socials: {
      linkedin: 'https://linkedin.com/in/faye-rauda',
      twitter:  'https://twitter.com/fayerauda',
    },
  },
  {
    id:     'fomonyuy-fomo',
    name:   'Mr. Fomonyuy Fomo',
    title:  'UI/UX Design Lead',
    role:   'UI/UX Lead',
    bio:    'Design systems thinker and user experience strategist who defines the visual and interaction language across all Tera-Tech products. Mr. Fomonyuy Fomo leads the UI/UX speciality track, mentors design interns, and ensures that every product shipped delivers a best-in-class experience for its users.',
    avatar: '/assets/team/fomonyuy-fomo.png',
    type:   'staff',
    order:  5,
    socials: {
      linkedin:  'https://linkedin.com/in/fomonyuy-fomo',
      instagram: 'https://instagram.com/fomonyuyfomo',
    },
  },
  {
    id:     'stevie-ange',
    name:   'Ms. Stevie Ange',
    title:  'Community Manager',
    role:   'Community Manager',
    bio:    'The heartbeat of the Tera-Tech community. Ms. Stevie Ange builds and sustains the relationships between current interns, alumni, volunteers, and the broader tech ecosystem in Cameroon. She manages the WhatsApp community, coordinates community events, and champions the Tera-Tech culture of collaboration and continuous learning.',
    avatar: '/assets/team/stevie-ange.png',
    type:   'staff',
    order:  6,
    socials: {
      linkedin:  'https://linkedin.com/in/stevie-ange',
      twitter:   'https://twitter.com/stevieange',
      instagram: 'https://instagram.com/stevieange',
    },
  },
  {
    id:     'idrish-farash',
    name:   'Mr. Idrish Farash',
    title:  'Social Media Manager',
    role:   'Social Media Manager',
    bio:    'Digital storyteller and brand voice for Tera-Tech across all social platforms. Mr. Idrish Farash creates and manages content that showcases intern journeys, project launches, and company milestones, growing Tera-Tech\'s visibility and reputation across LinkedIn, Twitter/X, and Instagram.',
    avatar: '/assets/team/idrish-farash.png',
    type:   'staff',
    order:  7,
    socials: {
      linkedin:  'https://linkedin.com/in/idrish-farash',
      twitter:   'https://twitter.com/idrishfarash',
      instagram: 'https://instagram.com/idrishfarash',
    },
  },
  {
    id:     'abihbombi-brida',
    name:   'Ms. Abihbombi Brida',
    title:  'Office Manager',
    role:   'Office Manager',
    bio:    'Operations anchor who keeps Tera-Tech running smoothly behind the scenes. Ms. Abihbombi Brida manages day-to-day office logistics, coordinates schedules, handles administrative processes, and ensures that the workspace and operational systems support the team\'s productivity and focus.',
    avatar: '/assets/team/abihbombi-brida.png',
    type:   'staff',
    order:  8,
    socials: {
      linkedin: 'https://linkedin.com/in/abihbombi-brida',
    },
  },
] as const
