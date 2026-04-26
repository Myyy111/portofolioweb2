'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: '#6c47ff',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 100,
        fontWeight: 600,
        fontSize: 14,
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(108,71,255,0.4)',
      }}
    >
      <Printer size={16} /> Print / Save PDF
    </button>
  )
}
