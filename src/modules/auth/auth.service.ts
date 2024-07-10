import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { JwtService } from '@nestjs/jwt'
import { CreateAuthDto } from './dto/create-auth.dto'
import { Helper } from '../../helpers'
import { Users } from '../../models/Users.model'
import { ResetPassword } from '../../models/ResetPassword.model'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly helper: Helper,
    private readonly mailerService: MailerService
  ) {}

  async register(payload: CreateAuthDto) {
    try {
      const user = await Users.findByPk(payload.email)

      if (user) throw new ConflictException('Email already exist')

      const hashPassword = await bcrypt.hash(payload.password, 12)

      await Users.create({
        email: payload.email,
        password: hashPassword
      })

      const result = {
        message: 'success',
        detail: 'Success Register User'
      }

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async login(payload: CreateAuthDto) {
    try {
      const user = await Users.findByPk(payload.email)

      if (!user) throw new NotFoundException('Email is not registered!')

      if (!(await bcrypt.compare(payload.password, user.password)))
        throw new UnauthorizedException('Invalid password')

      const tokenPayload = {
        email: user.email
      }

      const result = {
        message: 'Success',
        detail: 'Success Login User',
        data: {
          access_token: await this.jwtService.signAsync(tokenPayload)
        }
      }

      return result
    } catch (error) {
      throw error
    }
  }

  async forgotpassword(payload: CreateAuthDto) {
    try {
      const user = await Users.findByPk(payload.email)

      if (!user) throw new NotFoundException('Email not found')

      const resetToken = crypto.randomBytes(32).toString('hex')
      const resetTokenExpiryTime = new Date()
      resetTokenExpiryTime.setHours(resetTokenExpiryTime.getHours() + 1)

      await ResetPassword.create({
        email: payload.email,
        tokenResetPassword: resetToken,
        tokenExpiryTime: resetTokenExpiryTime
      })

      await this.mailerService.sendMail({
        to: payload.email,
        from: 'noreply@yoursupportteam.com',
        subject: 'Password Reset Request',
        template: './forgot-password.ejs',
        context: {
          resetLink: `http://localhost:3000/auth/reset-password?token=${resetToken}&email=${payload.email}`
        }
      })

      const result = {
        message: 'success',
        detail: 'Success Request Reset Password, Please check your email!'
      }

      return result
    } catch (error) {
      throw error
    }
  }

  async resetpassword(payload: CreateAuthDto) {
    try {
      const resetRequest = await ResetPassword.findOne({
        where: {
          email: payload.email,
          tokenResetPassword: payload.tokenResetPassword
        }
      })
      if (!resetRequest) throw new NotFoundException('Invalid token or email')

      const now = new Date()
      if (resetRequest.tokenExpiryTime < now)
        throw new UnauthorizedException('Token has expired')

      const user = await Users.findByPk(payload.email)
      if (!user) throw new NotFoundException('User not found')

      const hashPassword = await bcrypt.hash(payload.password, 12)
      await Users.update(
        { password: hashPassword },
        { where: { email: payload.email } }
      )

      await ResetPassword.destroy({
        where: {
          email: payload.email,
          tokenResetPassword: payload.tokenResetPassword
        }
      })

      const result = {
        message: 'success',
        detail: 'Password has been successfully reset'
      }

      return result
    } catch (error) {
      throw error
    }
  }
}
