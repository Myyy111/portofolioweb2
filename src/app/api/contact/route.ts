import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const contact = await prisma.contact.findFirst()
    return NextResponse.json(contact || { email: '', phone: '', location: '' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const contact = await prisma.contact.findFirst()

    if (!contact) {
      const newContact = await prisma.contact.create({ data: body })
      return NextResponse.json(newContact)
    }

    const updated = await prisma.contact.update({
      where: { id: contact.id },
      data: body
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Contact update error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
