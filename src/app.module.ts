import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
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
    AuthModule
  ]
})
export class AppModule {}
