interface ContactRequest {
  name?: string
  email?: string
  subject?: string
  message?: string
  website?: string
  attachment?: { name?: string; type?: string; data?: string }
}

interface ApiResponse {
  status: (code: number) => ApiResponse
  json: (body: { error?: string; success?: boolean }) => void
}

interface ApiRequest {
  method?: string
  body?: ContactRequest
  headers?: Record<string, string | string[] | undefined>
}

const requestLog = new Map<string, number[]>()
const RATE_LIMIT = 3
const RATE_WINDOW = 10 * 60 * 1000
const MAX_FILE_SIZE = 3 * 1024 * 1024

export default async function handler(
  request: ApiRequest,
  response: ApiResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message, website, attachment } = request.body ?? {}
  if (website?.trim()) return response.status(200).json({ success: true })

  const forwardedFor = request.headers?.['x-forwarded-for']
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const recent = (requestLog.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW)
  if (recent.length >= RATE_LIMIT) return response.status(429).json({ error: 'Too many requests' })
  recent.push(now)
  requestLog.set(ip, recent)

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return response.status(400).json({ error: 'All fields are required' })
  }
  if (name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 4000) {
    return response.status(400).json({ error: 'Message is too long' })
  }

  let file: { name: string; type: string; data: Buffer } | undefined
  if (attachment?.data) {
    const match = attachment.data.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) return response.status(400).json({ error: 'Invalid attachment' })
    const data = Buffer.from(match[2], 'base64')
    if (data.length > MAX_FILE_SIZE) return response.status(413).json({ error: 'Attachment is too large' })
    file = { name: attachment.name?.slice(0, 150) || 'attachment', type: attachment.type || 'application/octet-stream', data }
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!botToken || !chatId) {
    console.error('Missing Telegram environment variables')
    return response.status(500).json({ error: 'Contact service is not configured' })
  }

  const text = [
    'New portfolio contact message',
    '',
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Subject: ${subject.trim()}`,
    '',
    message.trim()
  ].join('\n').slice(0, 4096)

  try {
    const endpoint = file ? 'sendDocument' : 'sendMessage'
    const body = file
      ? (() => {
          const form = new FormData()
          form.append('chat_id', chatId)
          form.append('caption', text.slice(0, 1024))
          form.append('document', new Blob([file.data], { type: file.type }), file.name)
          return form
        })()
      : JSON.stringify({ chat_id: chatId, text: text.slice(0, 4096) })
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/${endpoint}`, {
      method: 'POST',
      ...(file ? {} : { headers: { 'Content-Type': 'application/json' } }),
      body
    })

    if (!telegramResponse.ok) {
      console.error('Telegram request failed:', await telegramResponse.text())
      return response.status(502).json({ error: 'Could not send message' })
    }

    return response.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact request failed:', error)
    return response.status(500).json({ error: 'Could not send message' })
  }
}
