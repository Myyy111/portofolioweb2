'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LangContext'
import { ArrowRight, Download, Sparkles } from 'lucide-react'

interface HeroData {
  title_en: string
  title_id: string
  subtitle_en: string
  subtitle_id: string
  cta_en: string
  cta_id: string
  badge_en: string
  badge_id: string
  image?: string | null
  cv_url?: string | null
}

const DEFAULT_HERO: HeroData = {
  title_en: "Building Digital Experiences That Inspire.",
  title_id: "Membangun Pengalaman Digital yang Menginspirasi.",
  subtitle_en: "Full-Stack Developer specialized in crafting elegant, high-performance web applications with modern technologies.",
  subtitle_id: "Full-Stack Developer yang berfokus pada pembuatan aplikasi web elegan dan berkinerja tinggi dengan teknologi modern.",
  cta_en: "View My Work",
  cta_id: "Lihat Karya Saya",
  badge_en: "Available for Freelance",
  badge_id: "Tersedia untuk Freelance",
}

export function HeroSection({ data }: { data?: HeroData | null }) {
  const { lang } = useLang()
  const hero = data || DEFAULT_HERO

  const title = lang === 'en' ? hero.title_en : hero.title_id
  const subtitle = lang === 'en' ? hero.subtitle_en : hero.subtitle_id
  const badge = lang === 'en' ? hero.badge_en : hero.badge_id

  // Split: all words except last become normal, last word gets gradient
  const words = title.split(' ')
  const lastWord = words[words.length - 1]
  const firstWords = words.slice(0, -1).join(' ')

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--navbar-height);
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 60px;
          align-items: center;
          width: 100%;
          padding: 80px 24px 60px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: clamp(40px, 5.5vw, 76px);
          line-height: 1.08;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 24px;
          font-family: 'Syne', sans-serif;
          letter-spacing: -0.02em;
        }
        .hero-subtitle {
          font-size: 17px;
          color: var(--text-secondary);
          max-width: 520px;
          margin-bottom: 40px;
          line-height: 1.75;
        }
        .hero-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 56px;
          flex-wrap: wrap;
        }
        .hero-image-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-image-ring {
          position: relative;
          width: 380px;
          height: 380px;
        }
        .hero-image-ring::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          animation: blob 8s ease-in-out infinite;
          z-index: 0;
        }
        .hero-image-inner {
          position: absolute;
          inset: 6px;
          border-radius: 38% 60% 53% 47% / 48% 43% 57% 52%;
          overflow: hidden;
          z-index: 1;
          animation: blob 8s ease-in-out infinite;
          background: var(--surface-2);
        }
        .hero-image-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-no-image {
          width: 380px;
          height: 380px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-no-image-circle {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(108,71,255,0.15), rgba(56,189,248,0.1));
          border: 1px solid rgba(108,71,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 80px;
          font-weight: 900;
          background-clip: text;
          -webkit-background-clip: text;
        }
        .hero-deco-dot {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          opacity: 0.7;
          filter: blur(1px);
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 60px 20px 40px;
            gap: 32px;
          }
          .hero-content-col {
            order: 2;
          }
          .hero-image-wrap {
            order: 1;
          }
          .hero-title {
            font-size: clamp(32px, 8vw, 52px);
            margin-bottom: 16px;
          }
          .hero-subtitle {
            font-size: 15px;
            margin: 0 auto 32px;
            max-width: 400px;
          }
          .hero-btns {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
            gap: 28px;
            margin-top: 36px;
          }
          .hero-image-ring {
            width: 220px;
            height: 220px;
          }
          .hero-no-image {
            width: 200px;
            height: 200px;
          }
          .hero-no-image-circle {
            width: 180px;
            height: 180px;
            font-size: 52px;
          }
          .badge {
            margin: 0 auto 20px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 30px;
          }
          .hero-btns {
            flex-direction: column;
            align-items: center;
          }
          .hero-btns a, .hero-btns button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
          .hero-stats {
            gap: 20px;
          }
        }
      `}</style>

      <section id="home" className="hero-section">
        {/* Background grid */}
        <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 0 }} />

        {/* Blobs */}
        <div style={{ position: 'absolute', width: 700, height: 700, background: 'radial-gradient(circle, rgba(108,71,255,0.12) 0%, transparent 70%)', top: '-10%', right: '-15%', zIndex: 0, filter: 'blur(60px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', bottom: '5%', left: '-10%', zIndex: 0, filter: 'blur(60px)', borderRadius: '50%' }} />

        <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>
          {/* Left: Content */}
          <div className="hero-content-col">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="badge" style={{ marginBottom: 28, display: 'inline-flex' }}>
                <span className="pulse-dot" style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', flexShrink: 0 }} />
                {badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {firstWords}{' '}
              <span className="gradient-text">{lastWord}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href="#projects" className="btn-primary">
                <Sparkles size={16} />
                {lang === 'en' ? 'View My Work' : 'Lihat Karya Saya'}
                <ArrowRight size={16} />
              </a>
              <a
                href={hero.cv_url || '#'}
                target={hero.cv_url ? '_blank' : undefined}
                rel={hero.cv_url ? 'noopener noreferrer' : undefined}
                className="btn-secondary"
              >
                <Download size={16} />
                {lang === 'en' ? 'Download CV' : 'Unduh CV'}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { value: '3+', label: lang === 'en' ? 'Years Exp.' : 'Tahun Pengalaman' },
                { value: '20+', label: lang === 'en' ? 'Projects Done' : 'Proyek Selesai' },
                { value: '15+', label: lang === 'en' ? 'Happy Clients' : 'Klien Puas' },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            className="hero-image-wrap"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {hero.image ? (
              <div className="hero-image-ring">
                <div className="hero-image-inner">
                  <img src={hero.image} alt={lang === 'en' ? 'Profile' : 'Foto Profil'} />
                </div>
                {/* Decorative dots */}
                <div className="hero-deco-dot" style={{ width: 16, height: 16, top: '8%', right: '-4%' }} />
                <div className="hero-deco-dot" style={{ width: 10, height: 10, bottom: '12%', left: '-3%', opacity: 0.5 }} />
                <div className="hero-deco-dot" style={{ width: 8, height: 8, top: '45%', right: '-8%', background: 'var(--gradient-end)' }} />
              </div>
            ) : (
              <div className="hero-no-image">
                <div className="hero-no-image-circle">
                  <span style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    HA
                  </span>
                </div>
                <div className="hero-deco-dot" style={{ width: 14, height: 14, top: '10%', right: '10%' }} />
                <div className="hero-deco-dot" style={{ width: 10, height: 10, bottom: '15%', left: '8%', opacity: 0.5 }} />
              </div>
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{ width: 22, height: 36, border: '2px solid var(--border-hover)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}
          >
            <div style={{ width: 4, height: 8, background: 'var(--accent)', borderRadius: 2 }} />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
