import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule } from '@nestjs/throttler'
import { LogLevel } from '@sentry/types'
import { SentryModule } from '@ntegral/nestjs-sentry'

import databaseConfig from './config/database.config'
import local from './config/local.config'
import { UserModule } from './module/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig, local],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL', 1000),
        limit: config.get('THROTTLE_LIMIT', 30),
      }),
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        dsn: config.get('sentry.dsn'),
        debug: process.env.NODE_ENV !== 'production',
        enabled: ['production', 'development'].includes(process.env.NODE_ENV),
        environment: process.env.NODE_ENV,
        release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
        logLevel: LogLevel.Debug,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database').uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
