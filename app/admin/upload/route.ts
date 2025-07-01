import { GLOBAL } from 'vieux-carre'
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

const s3 = new S3Client({
  region: GLOBAL.AWS.AWS_REGION!,
  credentials: {
    accessKeyId    : GLOBAL.AWS.AWS_ACCESS_KEY_ID,
    secretAccessKey: GLOBAL.AWS.AWS_SECRET_ACCESS_KEY
  }
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file     = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const fileBuffer = Buffer.from(await file.arrayBuffer())
  const fileKey    = `upload/${uuidv4()}-${file.name}`

  await s3.send(
    new PutObjectCommand({
      Bucket     : GLOBAL.AWS.S3_BUCKET_NAME,
      Key        : fileKey,
      Body       : fileBuffer,
      ContentType: file.type
    })
  )

  const publicUrl = `https://${GLOBAL.AWS.S3_BUCKET_NAME}.s3.${GLOBAL.AWS.AWS_REGION}.amazonaws.com/${fileKey}`
  return NextResponse.json({ url: publicUrl })
}
