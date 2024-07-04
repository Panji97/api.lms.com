import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './ironman.json'
import {
  BadRequestException,
  ValidationError,
  ValidationPipe
} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  })

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) =>
          Object.values(error.constraints).join(', ')
        )
        return new BadRequestException(messages.join(', '))
      }
    })
  )

  app.enableCors({
    origin: true,
    credentials: true
  })

  await app.listen(PORT)
}
bootstrap()
