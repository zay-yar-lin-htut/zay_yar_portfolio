interface ContactRequest {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface ApiResponse {
  status: (code: number) => ApiResponse
  json: (body: { error?: string; success?: boolean }) => void
}

export default async function handler(
  request: { method?: string; body?: ContactRequest },
  response: ApiResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = request.body ?? {}
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return response.status(400).json({ error: 'All fields are required' })
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
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
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
