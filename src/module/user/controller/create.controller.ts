import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserCreateRepository } from '../repository/create.repostiory'
import { UserMapper } from '../service/mapper'

@Controller()
export class UserCreateController {
  constructor(private readonly userCreateRepository: UserCreateRepository, private readonly userMapper: UserMapper) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('/auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = await this.userMapper.execute(req.user)
    this.userCreateRepository.execute(user)
    return user
  }
}
