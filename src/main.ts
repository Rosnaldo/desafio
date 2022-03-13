import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SentryService } from '@ntegral/nestjs-sentry'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filter/all-exceptions-filter'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const config = app.get<ConfigService>(ConfigService)

  app.useLogger(new Logger())

  app.useLogger(SentryService.SentryServiceInstance())

  app.useGlobalFilters(new AllExceptionsFilter(new SentryService()))

  app.enableCors()

  const port = config.get('port')
  await app.listen(port, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  process.on('unhandledPromiseRejectionWarning', (reason, promise) => {
    console.error(reason)
    console.log(promise)
  })

  process.on('uncaughtException', (err) => {
    console.error(err)
  })
}
bootstrap()
