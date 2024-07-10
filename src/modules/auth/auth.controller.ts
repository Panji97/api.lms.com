import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'

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

  @Post('/reset-password')
  resetpassword(@Body() payload: CreateAuthDto) {
    return this.authService.forgotpassword(payload)
  }
}
