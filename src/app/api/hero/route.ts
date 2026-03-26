import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst({
      where: { published: true }
    })
    return NextResponse.json(hero)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const hero = await prisma.hero.findFirst()
    if (!hero) {
      const newHero = await prisma.hero.create({ data: body })
      return NextResponse.json(newHero)
    }
    const updated = await prisma.hero.update({
      where: { id: hero.id },
      data: body
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
