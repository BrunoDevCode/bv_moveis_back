import { Schema } from 'mongoose';
import { prop } from '@typegoose/typegoose';

export default class Image {
  @prop()
  public name: string;

  @prop()
  public size: number;

  @prop()
  public key: string;

  @prop()
  public url: string;

  @prop({ type: Schema.Types.ObjectId, ref: 'User' })
  public userID: string;
}