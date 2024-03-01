import mailer from 'nodemailer'
export default class Transporter {
  constructor (config, templates = []) {
    this.transporter = mailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD
      }
    })
    this.appName = config.APP_NAME
    this.user = config.SMTP_USER
    this.templates = templates
  }
  send (to, subject, content, isPlainText = false) {
    return this.transporter.sendMail({
      from: `${this.appName} <${this.user}>`,
      to,
      subject,
      text: isPlainText ? content : null,
      html: !isPlainText ? content : null
    })
  }
  sendTemplate (to, templateName, params) {
    const { content, subject } = this.templates[templateName](params)
    return this.send(to, subject, content)
  }
}
