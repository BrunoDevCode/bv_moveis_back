import { Schema, model } from 'mongoose';
import { S3 } from 'aws-sdk';
import { unlink } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { APP_URL, BUCKET_NAME, STORAGE_TYPE } from '../config/env';

const s3 = new S3();

export interface ImageProps {
  name: string;
  size: number;
  key: string;
  url: string;
  itemAssigned: string;
  createdAt?: Date;
}

const ImageModel: Schema<ImageProps> = new Schema({
  name: String,

  size: {
    type: Number,
    required: true,
  },

  key: String,

  url: String,

  itemAssigned: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },

  isHomepage: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

ImageModel.pre('save', function () {
  if (!this.url) this.url = `${APP_URL}/files/${this.key}`;
});

ImageModel.pre('remove', function () {
  if (STORAGE_TYPE === 's3') {
    return s3.deleteObject({ Bucket: BUCKET_NAME, Key: this.key })
      .promise()
      .then(() => console.log('> Sucessful in remove the image!'))
      .catch((response) => {
        console.log('> Error in remove image');
        console.log(response.error);
      });
  }

  return promisify(unlink)(
    resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key),
  );
});

export default model('Image', ImageModel);
