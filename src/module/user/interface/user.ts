import { IEntity } from 'src/util/entity'

export interface IUser extends IEntity {
  first_name: string
  last_name: string
  photo_url: string
  email: string
}
