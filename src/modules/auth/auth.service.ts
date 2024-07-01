import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { Users } from '../../models/Users.model'

@Injectable()
export class AuthService {
  async register(createAuthDto: CreateAuthDto) {
    try {
      await Users.create(createAuthDto)
      return 'This action adds a new auth'
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
