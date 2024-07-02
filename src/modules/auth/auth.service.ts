import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { Users } from '../../models/Users.model'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(payload: CreateAuthDto) {
    try {
      const user = await Users.findByPk(payload.email)

      if (user)
        throw new ConflictException('Email already exist', {
          cause: new Error(),
          description: 'Email already exist, please use other email!'
        })

      const hashPassword = await bcrypt.hash(payload.password, 12)

      await Users.create({
        email: payload.email,
        password: hashPassword
      })

      const result = {
        message: 'success register user',
        data: null
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

      if (!user)
        throw new NotFoundException('Email is not registered!', {
          cause: new Error(),
          description: 'Your email is not registered, please register first!'
        })

      if (!(await bcrypt.compare(payload.password, user.password)))
        throw new UnauthorizedException('Invalid password', {
          cause: new Error(),
          description: 'The password you entered is incorrect'
        })

      const tokenPayload = {
        email: user.email
      }

      const result = {
        message: 'Success',
        messageDetail: 'Success Login User',
        data: {
          access_token: await this.jwtService.signAsync(tokenPayload)
        }
      }

      return result
    } catch (error) {
      throw error
    }
  }
}
