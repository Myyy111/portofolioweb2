import { prisma } from '@/lib/prisma'
import { Printer, Download, Globe, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getData() {
  try {
    const [hero, about, skills, projects, experiences, contact, socials] = await Promise.all([
      prisma.hero.findFirst({ where: { published: true } }),
      prisma.about.findFirst({ where: { published: true } }),
      prisma.skill.findMany({ where: { published: true }, orderBy: { level: 'desc' } }),
      prisma.project.findMany({ where: { published: true }, orderBy: [{ featured: 'desc' }, { order: 'asc' }] }),
      prisma.experience.findMany({ where: { published: true }, orderBy: { start_date: 'desc' } }),
      prisma.contact.findFirst({ where: { published: true } }),
      prisma.social.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
    ])
    return { hero, about, skills, projects, experiences, contact, socials }
  } catch {
    return { hero: null, about: null, skills: [], projects: [], experiences: [], contact: null, socials: [] }
  }
}

function formatDate(date: Date | null | undefined) {
  if (!date) return 'Present'
  return new Date(date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
}

export default async function PortfolioPage() {
  const { hero, about, skills, projects, experiences, contact, socials } = await getData()

  const name = hero?.title_id?.split('\n')[0] ?? 'Helmi Afandi'
  const subtitle = hero?.subtitle_id ?? hero?.subtitle_en ?? 'Full-Stack Developer'

  const techSkills = skills.filter(s => s.category === 'Technical' || s.category === 'Frontend' || s.category === 'Backend')
  const otherSkills = skills.filter(s => s.category !== 'Technical' && s.category !== 'Frontend' && s.category !== 'Backend')

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .portfolio-page { padding: 0 !important; background: white !important; }
          .portfolio-card { box-shadow: none !important; border: 1px solid #e5e7eb !important; }
          @page { margin: 15mm; size: A4; }
        }
        body { background: #f3f4f6; }
        .portfolio-page { min-height: 100vh; padding: 40px 20px; font-family: 'Inter', sans-serif; }
        .portfolio-card { max-width: 900px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 10px 60px rgba(0,0,0,0.12); overflow: hidden; }
        .port-header { background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); color: white; padding: 48px 48px 40px; }
        .port-body { padding: 0 48px 48px; }
        .port-section { margin-top: 36px; }
        .port-section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #6c47ff; border-bottom: 2px solid #6c47ff; padding-bottom: 6px; margin-bottom: 20px; }
        .port-grid { display: grid; gap: 16px; }
        .skill-pill { display: inline-flex; align-items: center; gap: 6px; background: #f3f0ff; color: #6c47ff; border-radius: 100px; padding: 4px 12px; font-size: 12px; font-weight: 600; margin: 3px; }
        .skill-bar-wrap { margin-bottom: 10px; }
        .skill-bar-label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px; }
        .skill-bar-bg { background: #e5e7eb; border-radius: 100px; height: 6px; }
        .skill-bar-fill { background: linear-gradient(90deg, #6c47ff, #38bdf8); border-radius: 100px; height: 6px; }
        .exp-item { border-left: 3px solid #6c47ff; padding-left: 20px; margin-bottom: 24px; position: relative; }
        .exp-item::before { content: ''; position: absolute; left: -7px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: #6c47ff; }
        .proj-item { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
        .tech-tag { display: inline-block; background: #f3f4f6; color: #374151; border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 600; margin: 2px; }
        .contact-row { display: flex; align-items: center; gap: 8px; color: #6b7280; font-size: 13px; margin-bottom: 8px; }
      `}</style>

      {/* Print/Download button */}
      <div className="no-print" style={{ position: 'fixed', top: 20, right: 20, display: 'flex', gap: 10, zIndex: 999 }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: '#374151', padding: '10px 20px', borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
          <Globe size={16} /> Website
        </a>
        <button onClick={() => window.print()} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#6c47ff', color: 'white', padding: '10px 20px', borderRadius: 100, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(108,71,255,0.4)' }}>
          <Printer size={16} /> Print / Save PDF
        </button>
      </div>

      <div className="portfolio-page">
        <div className="portfolio-card">

          {/* Header */}
          <div className="port-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <h1 style={{ fontSize: 40, fontWeight: 900, margin: 0, lineHeight: 1.1 }}>Ahmad Helmi Afandi</h1>
                <p style={{ fontSize: 18, opacity: 0.85, marginTop: 8, marginBottom: 24 }}>{subtitle}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  {contact?.email && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, opacity: 0.9 }}>
                      <Mail size={14} /> {contact.email}
                    </span>
                  )}
                  {contact?.phone && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, opacity: 0.9 }}>
                      <Phone size={14} /> {contact.phone}
                    </span>
                  )}
                  {contact?.location && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, opacity: 0.9 }}>
                      <MapPin size={14} /> {contact.location}
                    </span>
                  )}
                  {socials.slice(0, 3).map(s => (
                    <span key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, opacity: 0.9 }}>
                      <Globe size={14} /> {s.name}: {s.link}
                    </span>
                  ))}
                </div>
              </div>
              {hero?.image && (
                <img src={hero.image} alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.3)' }} />
              )}
            </div>
          </div>

          <div className="port-body">

            {/* About */}
            {about && (
              <div className="port-section">
                <div className="port-section-title">Tentang Saya</div>
                <p style={{ color: '#374151', lineHeight: 1.7, fontSize: 14 }}>
                  {about.description_id}
                </p>
              </div>
            )}

            {/* Two columns: Skills + Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 36 }}>
              {/* Skills */}
              <div>
                <div className="port-section-title">Keahlian Teknis</div>
                {skills.slice(0, 10).map(skill => (
                  <div key={skill.id} className="skill-bar-wrap">
                    <div className="skill-bar-label">
                      <span>{skill.name}</span>
                      <span style={{ color: '#6c47ff' }}>{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra info */}
              <div>
                <div className="port-section-title">Informasi Tambahan</div>
                <div style={{ fontSize: 13, color: '#374151', lineHeight: 2 }}>
                  <div><strong>Status:</strong> {hero?.badge_id ?? 'Tersedia untuk Freelance'}</div>
                  <div><strong>Bahasa:</strong> Indonesia (Native), English (Professional)</div>
                  <div><strong>Lokasi:</strong> {contact?.location ?? 'Indonesia'}</div>
                </div>

                {skills.length > 10 && (
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>Skill Lainnya</div>
                    <div>
                      {skills.slice(10).map(s => (
                        <span key={s.id} className="skill-pill">{s.name}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Experience */}
            {experiences.length > 0 && (
              <div className="port-section">
                <div className="port-section-title">Pengalaman Kerja</div>
                {experiences.map(exp => (
                  <div key={exp.id} className="exp-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{exp.title_id}</div>
                        <div style={{ fontSize: 13, color: '#6c47ff', fontWeight: 600, marginTop: 2 }}>{exp.company}{exp.location ? ` — ${exp.location}` : ''}</div>
                      </div>
                      <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6, marginTop: 8 }}>{exp.description_id}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="port-section">
                <div className="port-section-title">Proyek Unggulan</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {projects.slice(0, 6).map(proj => (
                    <div key={proj.id} className="proj-item">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{proj.title_id}</div>
                        {proj.featured && <span style={{ fontSize: 10, background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>Featured</span>}
                      </div>
                      <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: '6px 0' }}>
                        {proj.description_id.length > 120 ? proj.description_id.slice(0, 120) + '...' : proj.description_id}
                      </p>
                      <div>
                        {proj.tech_stack.map(t => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                      {proj.link && (
                        <a href={proj.link} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#6c47ff', marginTop: 8, textDecoration: 'none' }}>
                          <ExternalLink size={11} /> Lihat Proyek
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
