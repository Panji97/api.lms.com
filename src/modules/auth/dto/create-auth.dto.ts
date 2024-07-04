import { IsEmail, IsString } from 'class-validator'

export class CreateAuthDto {
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsString({ message: 'Email must be a string.' })
  email: string

  @IsString({ message: 'Password must be a string.' })
  password: string
}
