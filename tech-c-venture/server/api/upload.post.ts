import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // 認証チェック（本番環境では適切な認証を実装）
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const { filename, contentType } = body

  if (!filename || !contentType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Filename and content type are required'
    })
  }

  // ファイル名の安全性チェック
  const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  const timestamp = new Date().toISOString().slice(0, 10)
  const key = `uploads/${timestamp}/${safeFilename}`

  try {
    // Cloudflare R2クライアントの設定
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.r2AccessKeyId,
        secretAccessKey: config.r2SecretAccessKey
      }
    })

    // プリサインドURLを生成
    const command = new PutObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
      ContentType: contentType
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    return {
      uploadUrl,
      key,
      publicUrl: `${config.public.siteUrl}/images/uploads/${key}`
    }
  } catch (error) {
    console.error('Upload URL generation failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate upload URL'
    })
  }
})