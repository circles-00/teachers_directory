import nodemailer from 'nodemailer'
import { env } from '~/env.mjs'
import BrevoTransport from 'nodemailer-brevo-transport'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export class Mailer {
  static instance: Mailer | null = null
  transporter?: nodemailer.Transporter

  constructor() {
    this.transporter = this.createTransporter()
  }

  static get() {
    if (!this.instance) {
      this.instance = new Mailer()
    }
    return this.instance
  }

  createTransporter() {
    if (this.isDevelopmentMode()) return

    const transporterType = env.EMAIL_TRANSPORT_TYPE

    switch (transporterType) {
      case 'brevo':
        return this.createBrevoTransporter()
      default:
        return this.createSmtpTransporter()
    }
  }

  createBrevoTransporter() {
    return nodemailer.createTransport(
      new BrevoTransport({ apiKey: env.BREVO_API_KEY as string })
    )
  }

  createSmtpTransporter() {
    return (this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: parseInt(String(env.SMTP_PORT)),
      secure: false, // true for 465, false for other ports
      auth: {
        user: String(env.EMAIL_USER),
        pass: env.SMTP_PASSWORD,
      },
    }))
  }

  async sendMail(mailOptions: nodemailer.SendMailOptions) {
    return this.isDevelopmentMode()
      ? this.sendMailInDevelopmentMode(mailOptions)
      : this.transporter?.sendMail({
          ...mailOptions,
          from: String(env.EMAIL_USER),
        })
  }

  isDevelopmentMode() {
    return env.MAILER_ENV === 'development'
  }

  async sendMailInDevelopmentMode(mailOptions: nodemailer.SendMailOptions) {
    const filePath = join(__dirname, '../../../../../', 'mails.json')

    let file

    try {
      file = JSON.parse(await readFile(filePath, 'utf-8')) as any[]
    } catch (error) {
      file = []
    }

    file.push({ ...mailOptions, timestamp: new Date().toISOString() })

    file = file.sort(
      (a, b) =>
        // TODO: Make this type safe
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return writeFile(filePath, JSON.stringify(file, null, 2))
  }
}
