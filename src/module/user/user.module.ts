import { Module } from '@nestjs/common'
import { UserCreateController } from './controller/create.controller'
import { GoogleStrategy } from '../../common/auth/google.strategy'
import { UserCreateRepository } from './repository/create.repostiory'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schema/user'
import { UserMapper } from './service/mapper'

export const UserMongooseModule = MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
@Module({
  imports: [UserMongooseModule],
  providers: [GoogleStrategy, UserCreateRepository, UserMapper],
  controllers: [UserCreateController],
  exports: [],
})
export class UserModule {}
