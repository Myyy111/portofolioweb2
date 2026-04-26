'use client'

import { useLang } from '@/contexts/LangContext'
import { Heart } from 'lucide-react'

export function Footer({ contact }: { contact?: any }) {
  const { lang, t } = useLang()
  const year = new Date().getFullYear()

  const copy = contact?.footer_copy || `© ${year} Helmi. ${t.footer.rights}.`
  const made = contact?.footer_made || t.footer.built_with

  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '40px 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 14,
          }}>H</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
            helmi<span style={{ color: 'var(--accent)' }}>.</span>dev
          </span>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>{copy}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {made}
            <Heart size={12} style={{ color: '#ef4444', fill: '#ef4444' }} />
          </span>
        </div>

        {/* Back to top */}
        <a
          href="#"
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'var(--transition)',
          }}
          onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--accent)'}
          onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-muted)'}
        >
          {lang === 'en' ? '↑ Back to top' : '↑ Kembali ke atas'}
        </a>
      </div>
    </footer>
  )
}
