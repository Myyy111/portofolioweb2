'use client'

import { useLang } from '@/contexts/LangContext'
import { Heart } from 'lucide-react'

export function Footer({ contact }: { contact?: any }) {
  const { lang, t } = useLang()
  const year = new Date().getFullYear()

  // Default localized values if CMS fields are empty
  const defaultCopy = `© ${year} Helmi. ${t.footer.rights}.`
  const defaultMade = t.footer.built_with

  // Use CMS values if they exist, otherwise use defaults
  const copyText = contact?.footer_copy || defaultCopy
  const madeText = contact?.footer_made || defaultMade

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
        <div style={{ 
          fontSize: 13, 
          color: 'var(--text-muted)', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          gap: 4, 
          textAlign: 'center'
        }}>
          <div>{copyText}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {madeText}
            <Heart size={12} style={{ color: '#ef4444', fill: '#ef4444' }} />
          </div>
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
