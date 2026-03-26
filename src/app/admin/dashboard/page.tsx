'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Eye, 
  Briefcase, 
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ExternalLink,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSkills: 0,
    totalExperiences: 0,
  })

  useEffect(() => {
    // In a real app, fetch these from API
    // Setting dummy for now
    setStats({
      totalProjects: 12,
      totalSkills: 24,
      totalExperiences: 5,
    })
  }, [])

  const statCards = [
    { label: 'Total Projects', value: stats.totalProjects, icon: Briefcase, color: 'var(--accent)' },
    { label: 'Skills Added', value: stats.totalSkills, icon: TrendingUp, color: '#10b981' },
    { label: 'Experience Items', value: stats.totalExperiences, icon: Clock, color: '#f59e0b' },
    { label: 'Messages', value: 0, icon: MessageSquare, color: '#ef4444' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'Syne', marginBottom: '8px' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back to your portfolio management system.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card"
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              background: 'var(--bg-secondary)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: stat.color
            }}>
              <stat.icon size={28} />
            </div>
            <div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>{stat.label}</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Recent Projects</h3>
            <a href="/admin/projects" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>View All</a>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', padding: '40px 0' }}>
            No recent projects recorded.
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Quick Actions</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <a href="/" target="_blank" className="btn-secondary" style={{ fontSize: '13px', padding: '12px' }}>
              <ExternalLink size={14} /> Visit Site
            </a>
            <button className="btn-primary" style={{ fontSize: '13px', padding: '12px' }}>
              <Users size={14} /> Edit Hero
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
