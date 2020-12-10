import { hash } from 'bcryptjs';
import { prop, getModelForClass, pre } from '@typegoose/typegoose';

@pre<UserModel>('save', async function (next) {
  this.password = await hash(this.password, 10);
  next();
})

class UserModel {
  @prop()
  public name: string;

  @prop({ unique: true })
  public email: string;

  @prop({ select: false })
  public password: string;

  @prop({ required: true, default: Date.now() })
  public created_at?: Date;
}

export const User = getModelForClass(UserModel);
