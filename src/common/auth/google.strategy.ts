import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '117366663244-9hq8fu08lrq3026a2dpetuvk9bclp3q0.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4002/auth/google/callback',
      scope: ['email', 'profile'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    }
    done(null, user)
  }
}
