import { Schema, model } from 'mongoose';
import { hash } from 'bcryptjs';

interface UserProps {
  name: string;
  email: string;
  password: string;
  items?: Array<Object>;
  createdAt: Date;
}

const UserModel: Schema<UserProps> = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserModel.pre('save', async function (next) {
  this.password = await hash(this.password, 10);
  next();
});

export default model('User', UserModel);
