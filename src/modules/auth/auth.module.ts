import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { SECRET_JWT } from '../../ironman.json'
import { Helper } from '../../helpers'
import { Users } from '../../models/Users.model'
import { ResetPassword } from '../../models/ResetPassword.model'

@Module({
  controllers: [AuthController],
  providers: [AuthService, Helper],
  imports: [
    SequelizeModule.forFeature([Users, ResetPassword]),
    JwtModule.register({
      global: true,
      secret: SECRET_JWT,
      signOptions: { expiresIn: '60s' }
    })
  ]
})
export class AuthModule {}
