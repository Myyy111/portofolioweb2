'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2,
  CheckCircle2
} from 'lucide-react'

interface Skill {
  id: string
  name: string
  level: number
  category: string
  published: boolean
  order: number
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill> | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills')
      const data = await res.json()
      setSkills(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSkills() }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const method = currentSkill?.id ? 'PATCH' : 'POST'
    const url = currentSkill?.id ? `/api/skills/${currentSkill.id}` : '/api/skills'

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSkill)
      })
      setIsModalOpen(false)
      fetchSkills()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    await fetch(`/api/skills/${id}`, { method: 'DELETE' })
    fetchSkills()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Syne', marginBottom: '4px' }}>Skills</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage your technical expertise and proficiency levels.</p>
        </div>
        <button 
          onClick={() => { setCurrentSkill({ name: '', level: 80, category: 'Technical', published: true, order: 0 }); setIsModalOpen(true); }}
          className="btn-primary"
        >
          <Plus size={18} /> Add Skill
        </button>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}><Loader2 className="animate-spin" style={{ margin: '0 auto' }} /></td></tr>
              ) : skills.map(skill => (
                <tr key={skill.id}>
                  <td style={{ fontWeight: '600' }}>{skill.name}</td>
                  <td><span className="tech-tag">{skill.category}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, height: '6px', background: 'var(--surface-2)', borderRadius: '3px', width: '100px' }}>
                        <div style={{ width: `${skill.level}%`, height: '100%', background: 'var(--accent)', borderRadius: '3px' }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '700' }}>{skill.level}%</span>
                    </div>
                  </td>
                  <td>{skill.published ? 'Published' : 'Draft'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => { setCurrentSkill(skill); setIsModalOpen(true); }} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(skill.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
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
            <h2 style={{ marginBottom: '24px', fontFamily: 'Syne' }}>{currentSkill?.id ? 'Edit Skill' : 'New Skill'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Skill Name</label>
                <input 
                  type="text" className="input" required 
                  value={currentSkill?.name || ''}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Category</label>
                  <input 
                    type="text" className="input" required 
                    value={currentSkill?.category || ''}
                    onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Level (%)</label>
                  <input 
                    type="number" className="input" min="0" max="100" required 
                    value={currentSkill?.level || 0}
                    onChange={(e) => setCurrentSkill({ ...currentSkill, level: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
