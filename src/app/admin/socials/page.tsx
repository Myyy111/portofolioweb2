'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader2, Globe, Link as LinkIcon } from 'lucide-react'

interface Social {
  id: string
  name: string
  link: string
}

export default function AdminSocialsPage() {
  const [data, setData] = useState<Social[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [current, setCurrent] = useState<Partial<Social> | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/socials')
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const method = current?.id ? 'PATCH' : 'POST'
    const url = current?.id ? `/api/socials/${current.id}` : '/api/socials'

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(current)
      })
      setIsModalOpen(false)
      fetchItems()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Syne', marginBottom: '4px' }}>Social Links</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Connect your portfolio to your social platforms.</p>
        </div>
        <button 
          onClick={() => { setCurrent({ name: '', link: '' }); setIsModalOpen(true); }}
          className="btn-primary"
        >
          <Plus size={18} /> Add Link
        </button>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} style={{ textAlign: 'center', padding: '40px' }}><Loader2 className="animate-spin" style={{ margin: '0 auto' }} /></td></tr>
              ) : data.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '600' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={16} color="var(--accent)" /> {item.name}
                    </div>
                  </td>
                  <td>
                    <a href={item.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <LinkIcon size={12} /> {item.link}
                    </a>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => { setCurrent(item); setIsModalOpen(true); }} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button onClick={async () => { if(confirm('Delete?')) { await fetch(`/api/socials/${item.id}`, { method: 'DELETE' }); fetchItems(); } }} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ marginBottom: '24px', fontFamily: 'Syne' }}>Social Link</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Platform Name (e.g. GitHub, LinkedIn)</label>
                <input className="input" required value={current?.name || ''} onChange={(e) => setCurrent({ ...current, name: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>URL</label>
                <input className="input" required type="url" value={current?.link || ''} onChange={(e) => setCurrent({ ...current, link: e.target.value })} placeholder="https://..." />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : 'Save Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
