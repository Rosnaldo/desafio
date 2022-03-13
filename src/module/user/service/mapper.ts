import { Injectable } from '@nestjs/common'
import { IUser } from '../interface/user'

@Injectable()
export class UserMapper {
  async execute(data: any): Promise<IUser> {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      photo_url: data.picture,
      email: data.email,
    }
  }
}
