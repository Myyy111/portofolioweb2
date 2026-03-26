import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      where: { published: true }
    })
    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const about = await prisma.about.findFirst()
    if (!about) {
      const newAbout = await prisma.about.create({ data: body })
      return NextResponse.json(newAbout)
    }
    const updated = await prisma.about.update({
      where: { id: about.id },
      data: body
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
