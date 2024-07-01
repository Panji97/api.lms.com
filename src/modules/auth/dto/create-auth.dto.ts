import { IsEmail, IsString } from 'class-validator'

export class CreateAuthDto {
  @IsEmail()
  @IsString()
  email: string

  @IsString()
  password: string
}
