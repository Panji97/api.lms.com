import { MailerService } from '@nestjs-modules/mailer'

export class Helper {
  constructor(private readonly mailerService: MailerService) {}

  async Email() {
    await this.mailerService.sendMail({
      to: 'wadespo@yopmail.com',
      from: 'noreply@nestjs.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: '<b>welcome</b>'
    })
  }
}
