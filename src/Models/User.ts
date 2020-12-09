import { prop, getModelForClass } from '@typegoose/typegoose';

class UserModel {
  @prop()
  public name: string;

  @prop({ unique: true })
  public email: string;

  @prop({ select: true })
  public password: string;

  @prop({ required: true, default: Date.now() })
  public created_at: Date;
}

export const User = getModelForClass(UserModel);