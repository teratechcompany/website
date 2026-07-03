export const TRACKS = [
  { id: 'frontend',  label: 'Frontend Engineering', icon: '⬡', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind'], outcome: 'Build interfaces users trust' },
  { id: 'backend',   label: 'Backend Engineering',  icon: '⬡', tools: ['Node.js', 'Laravel', 'PostgreSQL', 'FastAPI'], outcome: 'APIs, databases, and services' },
  { id: 'uiux',      label: 'UI/UX Design',          icon: '◈', tools: ['Figma', 'Prototyping', 'User Research', 'Design Systems'], outcome: 'Design systems that convert' },
  { id: 'mobile',    label: 'Mobile Development',    icon: '◈', tools: ['Flutter', 'Dart', 'Firebase', 'Android'], outcome: 'Cross-platform native apps' },
  { id: 'data',      label: 'Data & AI',             icon: '▣', tools: ['Python', 'TensorFlow', 'Pandas', 'SQL'], outcome: 'Models that move metrics' },
  { id: 'cloud',     label: 'Cloud & DevOps',        icon: '▣', tools: ['Docker', 'Linux', 'CI/CD', 'Hetzner'], outcome: 'Infrastructure that never sleeps' },
  { id: 'security',  label: 'Cybersecurity',         icon: '⬡', tools: ['Network Analysis', 'Pen Testing', 'SIEM', 'OSINT'], outcome: 'Defend. Detect. Respond.' },
  { id: 'marketing', label: 'Digital Marketing',     icon: '◈', tools: ['SEO', 'Analytics', 'Content Strategy', 'Ads'], outcome: 'Growth systems that scale' },
] as const

export type TrackId = typeof TRACKS[number]['id']
