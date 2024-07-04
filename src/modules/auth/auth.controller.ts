import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() payload: CreateAuthDto) {
    return this.authService.register(payload)
  }

  @Post('/login')
  login(@Body() payload: CreateAuthDto) {
    return this.authService.login(payload)
  }

  @Post('/forgot-password')
  forgotpassword(@Body() payload: CreateAuthDto) {
    return this.authService.forgotpassword(payload)
  }
}
