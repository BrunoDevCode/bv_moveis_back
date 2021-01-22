import { Schema, model } from 'mongoose';
import { ImageProps } from './Image';

export interface IItem {
  _id: string;
  name: string;
  description: string;
  isHomepage: Boolean;
  isAvailable: Boolean;
  images?: ImageProps[] | null;
  user: string;
  createdAt?: Date;
}

const ItemModel: Schema<IItem> = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  isAvailable: {
    type: Boolean,
    default: false,
  },

  isHomepage: {
    type: Boolean,
    default: false,
  },

  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image',
  }],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Item', ItemModel);
