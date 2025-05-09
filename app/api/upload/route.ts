import { GLOBAL } from 'vieux-carre'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: GLOBAL.AWS.AWS_REGION!,
  credentials: {
    accessKeyId    : GLOBAL.AWS.AWS_ACCESS_KEY_ID!,
    secretAccessKey: GLOBAL.AWS.AWS_SECRET_ACCESS_KEY!
  }
})

export async function POST(req: Request) {
  const { filename, fileType } = await req.json()

  const command = new PutObjectCommand({
    Bucket      : GLOBAL.AWS.S3_BUCKET_NAME!,
    Key         : filename,
    ContentType : fileType
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 60 })

  return Response.json({ url })
}
