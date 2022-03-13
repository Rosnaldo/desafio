import { Module } from '@nestjs/common'
import { UserCreateController } from './controller/create.controller'
import { GoogleStrategy } from '../../common/auth/google.strategy'

@Module({
  imports: [],
  providers: [GoogleStrategy],
  controllers: [UserCreateController],
  exports: [],
})
export class UserModule {}
