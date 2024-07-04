import * as bcrypt from 'bcrypt'
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { Users } from '../../models/Users.model'
import { JwtService } from '@nestjs/jwt'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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
      return 'madang'
    } catch (error) {
      throw error
    }
  }
}
