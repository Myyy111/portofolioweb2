import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`

    // Check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError)
    } else {
      const exists = buckets.find(b => b.name === 'uploads')
      if (!exists) {
        return NextResponse.json({ 
          error: 'Bucket "uploads" not found in Supabase Storage. Please create it manually in the Supabase Dashboard.' 
        }, { status: 500 })
      }
    }

    const { error } = await supabase.storage
      .from('uploads')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (error) {
      console.error('Supabase upload error details:', JSON.stringify(error, null, 2))
      return NextResponse.json({ 
        error: 'Upload failed: ' + error.message,
        details: error 
      }, { status: 500 })
    }

    const { data } = supabase.storage.from('uploads').getPublicUrl(filename)

    return NextResponse.json({ url: data.publicUrl })
  } catch (error: any) {
    console.error('Catch-all upload error:', error)
    return NextResponse.json({ 
      error: 'Upload failed internally',
      message: error.message 
    }, { status: 500 })
  }
}
