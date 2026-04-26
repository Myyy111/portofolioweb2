import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message, subject } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const newMessage = await prisma.message.create({
      data: { name, email, message, subject }
    })

    return NextResponse.json(newMessage)
  } catch (error) {
    return NextResponse.json({ error: 'Error sending message' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 })
  }
}
