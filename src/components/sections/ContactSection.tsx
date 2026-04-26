'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LangContext'
import { Mail, MapPin, Phone, GitBranch, Link2, Send, Globe, Twitter, Facebook, Youtube } from 'lucide-react'
import { useState } from 'react'

interface ContactData {
  email: string
  phone?: string | null
  location?: string | null
}

interface Social {
  id: string
  name: string
  link: string
  icon?: string | null
}

const formatLink = (url: string | null | undefined) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url
  return `https://${url}`
}

const DEFAULT_CONTACT: ContactData = {
  email: 'helmi@example.com',
  phone: '+62 812 3456 7890',
  location: 'Jakarta, Indonesia',
}

const ICON_MAP: Record<string, React.ElementType> = {
  github: GitBranch,
  linkedin: Link2,
  instagram: Link2,
  twitter: Twitter,
  x: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  dribbble: Globe,
  behance: Globe,
  link: Link2,
}

export function ContactSection({
  contact,
  socials,
}: {
  contact?: ContactData | null
  socials?: Social[] | null
}) {
  const { lang, t } = useLang()
  const contactData = contact || DEFAULT_CONTACT
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">{t.contact.subtitle}</p>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-desc">
            {lang === 'en'
              ? "Have a project in mind? Let's build something amazing together."
              : 'Punya proyek? Mari kita bangun sesuatu yang luar biasa bersama.'}
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48,
          maxWidth: 960,
          margin: '0 auto',
        }}>
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              {lang === 'en' ? "Let's Talk" : 'Mari Bicara'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {lang === 'en'
                ? "I'm always open to new opportunities and collaborations. Whether you have a project, a question, or just want to say hi — my inbox is always open."
                : 'Saya selalu terbuka untuk peluang dan kolaborasi baru. Apapun yang ingin Anda diskusikan, jangan ragu untuk menghubungi saya.'}
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: Mail, value: contactData.email, href: `mailto:${contactData.email}` },
                ...(contactData.phone ? [{ icon: Phone, value: contactData.phone, href: `tel:${contactData.phone}` }] : []),
                ...(contactData.location ? [{ icon: MapPin, value: contactData.location, href: undefined }] : []),
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40,
                    background: 'var(--accent-light)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}>
                    <item.icon size={16} />
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--text-primary)', fontSize: 15, textDecoration: 'none' }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--accent)'}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontSize: 15 }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            {socials && socials.length > 0 && (
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                  {lang === 'en' ? 'Follow Me' : 'Ikuti Saya'}
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {socials.map(s => {
                    const IconComp = ICON_MAP[s.name.toLowerCase()] || Link2
                    return (
                      <a
                        key={s.id}
                        href={formatLink(s.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 40, height: 40,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 10,
                          color: 'var(--text-muted)',
                          textDecoration: 'none',
                          transition: 'var(--transition)',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget).style.borderColor = 'var(--accent)'
                          ;(e.currentTarget).style.color = 'var(--accent)'
                          ;(e.currentTarget).style.background = 'var(--accent-light)'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget).style.borderColor = 'var(--border)'
                          ;(e.currentTarget).style.color = 'var(--text-muted)'
                          ;(e.currentTarget).style.background = 'var(--surface)'
                        }}
                      >
                        <IconComp size={16} />
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    {lang === 'en' ? 'Name' : 'Nama'}
                  </label>
                  <input
                    className="input"
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'Your name' : 'Nama Anda'}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    Email
                  </label>
                  <input
                    className="input"
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  {lang === 'en' ? 'Message' : 'Pesan'}
                </label>
                <textarea
                  className="input"
                  required
                  rows={5}
                  placeholder={t.contact.message_placeholder}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ resize: 'vertical', minHeight: 120 }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
                style={{ justifyContent: 'center' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Send size={15} />
                  {status === 'sending'
                    ? (lang === 'en' ? 'Sending...' : 'Mengirim...')
                    : status === 'sent'
                    ? (lang === 'en' ? '✓ Sent!' : '✓ Terkirim!')
                    : t.contact.send}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
