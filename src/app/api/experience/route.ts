import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { start_date: 'desc' }
    })
    return NextResponse.json(experiences)
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed', message: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const experience = await prisma.experience.create({ 
      data: {
        ...body,
        start_date: new Date(body.start_date),
        end_date: body.end_date ? new Date(body.end_date) : null
      }
    })
    return NextResponse.json(experience)
  } catch (error: any) {
    console.error('Create experience error:', error)
    return NextResponse.json({ error: 'Failed', message: error.message }, { status: 500 })
  }
}
