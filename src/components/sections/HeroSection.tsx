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
  image?: string
}

const DEFAULT_HERO: HeroData = {
  title_en: "Building Digital\nExperiences That\nInspire.",
  title_id: "Membangun Pengalaman\nDigital yang\nMenginspirasi.",
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

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--navbar-height)',
      }}
    >
      {/* Background grid */}
      <div
        className="grid-pattern"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      {/* Blobs */}
      <div
        className="blob"
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(108,71,255,0.15) 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
          zIndex: 0,
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255, 107, 71, 0.12) 0%, transparent 70%)',
          bottom: '10%',
          left: '-5%',
          zIndex: 0,
          filter: 'blur(40px)',
          animation: 'blob 10s ease-in-out infinite 2s',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: hero.image ? '1.2fr 0.8fr' : '1fr', 
          gap: '64px',
          alignItems: 'center'
        }}>
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge" style={{ marginBottom: 32, display: 'inline-flex' }}>
                <span className="pulse-dot" style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', flexShrink: 0 }} />
                {badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: 'clamp(48px, 7vw, 88px)',
                lineHeight: 1.08,
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: 28,
                whiteSpace: 'pre-line',
              }}
            >
              {title.split('\n').map((line, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="gradient-text">{line}</span>
                ) : (
                  <span key={i}>{line}{'\n'}</span>
                )
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                fontSize: 18,
                color: 'var(--text-secondary)',
                maxWidth: 540,
                marginBottom: 48,
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
            >
              <a href="#projects" className="btn-primary">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={16} />
                  {lang === 'en' ? 'View My Work' : 'Lihat Karya Saya'}
                  <ArrowRight size={16} />
                </span>
              </a>
              <a href="#contact" className="btn-secondary">
                <Download size={16} />
                {lang === 'en' ? 'Download CV' : 'Unduh CV'}
              </a>
            </motion.div>
          </div>

          {hero.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                overflow: 'hidden',
                border: '8px solid var(--surface-2)',
                boxShadow: 'var(--shadow-lg)',
                animation: 'blob 10s ease-in-out infinite',
              }}>
                <img src={hero.image} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 72,
            flexWrap: 'wrap',
          }}
        >
            {[
              { value: '3+', label: lang === 'en' ? 'Years Exp.' : 'Tahun Pengalaman' },
              { value: '20+', label: lang === 'en' ? 'Projects Done' : 'Proyek Selesai' },
              { value: '15+', label: lang === 'en' ? 'Happy Clients' : 'Klien Puas' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: 36,
                  fontWeight: 800,
                  fontFamily: 'Syne, sans-serif',
                  background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{
            width: 22,
            height: 36,
            border: '2px solid var(--border-hover)',
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <div style={{
            width: 4,
            height: 8,
            background: 'var(--accent)',
            borderRadius: 2,
          }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
