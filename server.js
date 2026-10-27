import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))

const emailConfigured = () => Boolean(
  process.env.MAIL_HOST &&
  process.env.MAIL_USER &&
  process.env.MAIL_PASSWORD &&
  process.env.ENQUIRY_EMAIL,
)

const mailer = () => nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 587),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', email: emailConfigured() ? 'configured' : 'not configured' })
})

app.post('/api/enquiries', async (request, response) => {
  if (!emailConfigured()) {
    return response.status(503).json({ message: 'The enquiry email service has not been configured yet.' })
  }

  const { name, phone, email = '', plotSize = '', message = '' } = request.body || {}
  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanPhone = typeof phone === 'string' ? phone.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim() : ''
  const cleanPlotSize = typeof plotSize === 'string' ? plotSize.trim() : ''
  const cleanMessage = typeof message === 'string' ? message.trim() : ''

  if (cleanName.length < 2 || cleanName.length > 80 || !/^[0-9+()\s-]{8,20}$/.test(cleanPhone)) {
    return response.status(400).json({ message: 'Please enter a valid name and phone number.' })
  }

  if (cleanEmail && (cleanEmail.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))) {
    return response.status(400).json({ message: 'Please enter a valid email address.' })
  }

  if (cleanPlotSize.length > 40 || cleanMessage.length > 1000) {
    return response.status(400).json({ message: 'Please shorten your enquiry and try again.' })
  }

  try {
    await mailer().sendMail({
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to: process.env.ENQUIRY_EMAIL,
      replyTo: cleanEmail || undefined,
      subject: 'New Harika Paradise enquiry',
      text: [
        'A new enquiry was submitted from the Harika Paradise website.',
        '',
        `Name: ${cleanName}`,
        `Phone: ${cleanPhone}`,
        `Email: ${cleanEmail || 'Not provided'}`,
        `Preferred plot size: ${cleanPlotSize || 'Not specified'}`,
        `Message: ${cleanMessage || 'Not provided'}`,
      ].join('\n'),
    })

    return response.status(200).json({ message: 'Thank you. Your enquiry has been sent.' })
  } catch (error) {
    console.error('Unable to send enquiry email:', error.message)
    return response.status(502).json({ message: 'We could not send your enquiry right now. Please try again.' })
  }
})

app.listen(port, () => {
  console.log(`Harika Paradise API listening on http://localhost:${port}`)

  if (!emailConfigured()) {
    console.warn('Set the SMTP and ENQUIRY_EMAIL values in .env to enable enquiry delivery.')
  }
})
