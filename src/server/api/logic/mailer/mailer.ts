import nodemailer from 'nodemailer'
import { env } from '~/env.mjs'

export class Mailer {
  static instance: Mailer | null = null
  transporter: nodemailer.Transporter

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
    return (this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST as string,
      port: parseInt(env.SMTP_PORT as string),
      secure: false, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER as string,
        pass: env.SMTP_PASSWORD as string,
      },
    }))
  }

  async sendMail(mailOptions: nodemailer.SendMailOptions) {
    return this.transporter?.sendMail({
      ...mailOptions,
      from: env.SMTP_USER as string,
    })
  }
}
