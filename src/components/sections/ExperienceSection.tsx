'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LangContext'
import { formatDate } from '@/lib/utils'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

interface Experience {
  id: string
  title_en: string
  title_id: string
  company: string
  location?: string | null
  start_date: string | Date
  end_date?: string | Date | null
  description_en: string
  description_id: string
}

const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: '1',
    title_en: 'Full-Stack Developer',
    title_id: 'Pengembang Full-Stack',
    company: 'Freelance',
    location: 'Remote',
    start_date: '2023-01-01',
    end_date: null,
    description_en: 'Building custom web applications and CMS systems for clients across Indonesia. Specialized in Next.js, PostgreSQL, and modern UI development.',
    description_id: 'Membangun aplikasi web dan sistem CMS khusus untuk klien di seluruh Indonesia. Spesialisasi dalam Next.js, PostgreSQL, dan pengembangan UI modern.',
  },
  {
    id: '2',
    title_en: 'Frontend Developer',
    title_id: 'Pengembang Frontend',
    company: 'Duta Solusi',
    location: 'Jakarta, Indonesia',
    start_date: '2021-06-01',
    end_date: '2022-12-01',
    description_en: 'Developed and maintained frontend for company products using React and Vue.js. Collaborated with design team to implement pixel-perfect UIs.',
    description_id: 'Mengembangkan dan memelihara frontend produk perusahaan menggunakan React dan Vue.js. Berkolaborasi dengan tim desain untuk mengimplementasikan UI yang sempurna.',
  },
  {
    id: '3',
    title_en: 'Junior Web Developer',
    title_id: 'Pengembang Web Junior',
    company: 'Startup Digital',
    location: 'Bandung, Indonesia',
    start_date: '2020-01-01',
    end_date: '2021-05-01',
    description_en: 'Started career building WordPress and PHP-based websites. Learned modern JavaScript frameworks and best practices.',
    description_id: 'Memulai karir membangun website berbasis WordPress dan PHP. Belajar framework JavaScript modern dan praktik terbaik.',
  },
]

export function ExperienceSection({ data }: { data?: Experience[] | null }) {
  const { lang, t } = useLang()
  const experiences = (data && data.length > 0) ? data : DEFAULT_EXPERIENCES

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">{t.experience.subtitle}</p>
          <h2 className="section-title">{t.experience.title}</h2>
        </motion.div>

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          {experiences.map((exp, i) => {
            const title = lang === 'en' ? exp.title_en : exp.title_id
            const desc = lang === 'en' ? exp.description_en : exp.description_id
            const start = formatDate(exp.start_date)
            const end = exp.end_date ? formatDate(exp.end_date) : t.experience.present

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{
                  display: 'flex',
                  gap: 24,
                  marginBottom: 16,
                }}
              >
                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
                  <div className="timeline-dot" />
                  {i < experiences.length - 1 && <div className="timeline-line" />}
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '24px 28px',
                    marginBottom: 8,
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-light)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
                  }}
                >
                  {/* Header */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)' }}>
                        {title}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        color: 'var(--accent)',
                        fontWeight: 600,
                        background: 'var(--accent-light)',
                        padding: '4px 10px',
                        borderRadius: 100,
                        whiteSpace: 'nowrap',
                      }}>
                        <Calendar size={11} />
                        {start} — {end}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                        <Briefcase size={13} />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)' }}>
                          <MapPin size={13} />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
