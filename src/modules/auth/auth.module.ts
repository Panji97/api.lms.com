import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { Users } from '../../models/Users.model'
import { SECRET_JWT } from '../../ironman.json'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: SECRET_JWT,
      signOptions: { expiresIn: '60s' }
    })
  ]
})
export class AuthModule {}
