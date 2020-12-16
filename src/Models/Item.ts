import { Schema, model } from 'mongoose';

const ItemModel = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  stockCount: {
    type: Number,
    default: 0,
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
