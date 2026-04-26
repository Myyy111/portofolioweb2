'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLang } from '@/contexts/LangContext'

interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon?: string | null
}

const DEFAULT_SKILLS: Skill[] = [
  { id: '1', name: 'React / Next.js', level: 92, category: 'Frontend' },
  { id: '2', name: 'TypeScript', level: 88, category: 'Frontend' },
  { id: '3', name: 'Tailwind CSS', level: 90, category: 'Frontend' },
  { id: '4', name: 'Framer Motion', level: 80, category: 'Frontend' },
  { id: '5', name: 'Node.js / Express', level: 85, category: 'Backend' },
  { id: '6', name: 'PostgreSQL', level: 82, category: 'Backend' },
  { id: '7', name: 'Prisma ORM', level: 84, category: 'Backend' },
  { id: '8', name: 'Git / DevOps', level: 78, category: 'Tools' },
  { id: '9', name: 'Figma', level: 72, category: 'Design' },
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      style={{ marginBottom: 20 }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection({ data }: { data?: Skill[] | null }) {
  const { lang, t } = useLang()
  const skills = (data && data.length > 0) ? data : DEFAULT_SKILLS
  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))]
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = (activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory))
    .sort((a, b) => b.level - a.level)

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">{t.skills.subtitle}</p>
          <h2 className="section-title">{t.skills.title}</h2>
        </motion.div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                border: '1px solid',
                transition: 'var(--transition)',
                background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 32,
        }}>
          {filtered.map((skill, i) => (
            <SkillBar
              key={skill.id}
              name={skill.name}
              level={skill.level}
              delay={i * 0.05}
            />
          ))}
        </div>

        {/* Tech Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: 64, textAlign: 'center' }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            {lang === 'en' ? 'Also familiar with' : 'Juga familiar dengan'}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Docker', 'Redis', 'AWS', 'Vercel', 'GraphQL', 'MongoDB', 'Vue.js', 'Laravel', 'Python'].map(tech => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
