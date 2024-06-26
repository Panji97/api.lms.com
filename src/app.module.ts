import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { MARIADB } from './ironman.json'
import { UsersModule } from './users/users.module'

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
    UsersModule
  ]
})
export class AppModule {}
