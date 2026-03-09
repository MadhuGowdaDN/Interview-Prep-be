import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({
  timestamps: true,
})
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
    select: false,
  })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);