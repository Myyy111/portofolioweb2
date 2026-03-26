import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, GitBranch } from 'lucide-react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  try {
    const project = await prisma.project.findUnique({ where: { id } })
    if (!project) return { title: 'Project Not Found' }
    return {
      title: `${project.title_en} | Helmi Portfolio`,
      description: project.description_en,
    }
  } catch {
    return { title: 'Project' }
  }
}

const formatLink = (url: string | null | undefined) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url
  return `https://${url}`
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let project = null
  try {
    project = await prisma.project.findUnique({ where: { id, published: true } })
  } catch {
    // DB not connected, use null
  }

  if (!project) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '60px 24px' }}>
          <Link
            href="/#projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14,
              fontWeight: 500, marginBottom: 40,
              transition: 'var(--transition)',
            }}
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 40 }}>
              <span style={{
                fontSize: 12, fontWeight: 700, color: 'var(--accent)',
                textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 12,
              }}>
                {project.category}
              </span>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
                {project.title_en}
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 640 }}>
                {project.description_en}
              </p>
            </div>

            {/* Image */}
            {project.image && (
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 40, aspectRatio: '16/9', position: 'relative' }}>
                <Image src={project.image} alt={project.title_en} fill style={{ objectFit: 'cover' }} />
              </div>
            )}

            {/* Info grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20, marginBottom: 40,
            }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px' }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                  Tech Stack
                </h4>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {project.tech_stack.map((tech: string) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px' }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                  Links
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {project.link && (
                    <a href={formatLink(project.link)} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontSize: 14, textDecoration: 'none', fontWeight: 600 }}>
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={formatLink(project.github)} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
                      <GitBranch size={14} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
