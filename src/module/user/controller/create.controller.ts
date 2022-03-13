import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class UserCreateController {
  logger
  constructor() {
    this.logger = new Logger(UserCreateController.name)
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('/auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    const user = req.user
    this.logger.log(user)
    return user
  }
}
