import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class Helper {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string, html: string) {
    await this.mailerService.sendMail({
      to,
      from: 'noreply@yoursupportteam.com',
      subject,
      text,
      html
    })
    return
  }
}
