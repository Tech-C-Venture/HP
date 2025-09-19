import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // マルチパートデータを読み取り
    const form = await readFormData(event)
    const file = form.get('file') as File

    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ファイルが見つかりません'
      })
    }

    // ファイルタイプをチェック
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: '許可されていないファイルタイプです'
      })
    }

    // ファイルサイズをチェック（5MB制限）
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ファイルサイズが大きすぎます（最大5MB）'
      })
    }

    // 環境変数から設定を取得
    const config = useRuntimeConfig()

    // Cloudflare R2の設定
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: config.r2.endpoint,
      credentials: {
        accessKeyId: config.r2.accessKeyId,
        secretAccessKey: config.r2.secretAccessKey,
      },
    })

    // ファイル名を生成（重複を避けるためタイムスタンプを付加）
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`
    const key = `uploads/${fileName}`

    // ファイルをArrayBufferに変換
    const buffer = await file.arrayBuffer()

    // R2にアップロード
    const uploadCommand = new PutObjectCommand({
      Bucket: config.r2.bucketName,
      Key: key,
      Body: new Uint8Array(buffer),
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    })

    await s3Client.send(uploadCommand)

    // 公開URLを生成
    const publicUrl = `${config.r2.publicUrl}/${key}`

    return {
      success: true,
      url: publicUrl,
      fileName: fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
    }

  } catch (error) {
    console.error('Upload error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'ファイルのアップロードに失敗しました'
    })
  }
})