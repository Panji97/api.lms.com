import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { Users } from '../../models/Users.model'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(payload: CreateAuthDto) {
    try {
      await Users.create(payload)
      return 'This action adds a new auth'
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
          description: 'Your email is not registered, please register first'
        })

      if (user.password !== payload.password)
        throw new UnauthorizedException('Invalid password', {
          cause: new Error(),
          description: 'The password you entered is incorrect'
        })

      const tokenPayload = {
        email: user.email
      }

      const result = {
        message: 'success user login',
        access_token: await this.jwtService.signAsync(tokenPayload)
      }

      return result
    } catch (error) {
      throw error
    }
  }
}
