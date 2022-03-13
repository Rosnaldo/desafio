import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IUser } from '../interface/user'

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  collection: 'users',
})
export class User implements IUser {
  @Prop({ type: String, required: true })
  first_name: string

  @Prop({ type: String, required: true })
  last_name: string

  @Prop({ type: String, required: true })
  photo_url: string

  @Prop({ type: String, required: true })
  email: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
