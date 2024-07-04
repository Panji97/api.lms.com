import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { MARIADB } from './ironman.json'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: MARIADB.HOST,
      port: MARIADB.PORT,
      username: MARIADB.USER,
      password: MARIADB.PASS,
      database: MARIADB.NAME,
      autoLoadModels: true,
      logging: false
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>'
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    AuthModule
  ]
})
export class AppModule {}
