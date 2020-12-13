import { Schema } from 'mongoose';
import aws from 'aws-sdk';
import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import { APP_URL, BUCKET_NAME, STORAGE_TYPE } from '../config/env';

const s3 = new aws.S3();

@pre<ImageModel>('save', function () {
  if (!this.url) {
    this.url = `${APP_URL}/files/${this.key}`;
  }
})

@pre<ImageModel>('remove', function () {
  if (STORAGE_TYPE === 's3') {
    return s3
      .deleteObject({
        Bucket: BUCKET_NAME,
        Key: this.key,
      })
      .promise()
      .then(() => {
        console.log('> Sucessful in save the image!');
      })
      .catch(response => {
        console.log('> Error in save image');
        console.log(`> ${response.error}`);
      });
  } else {
    return promisify(fs.unlink)(
      resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
    );
  }
})

class ImageModel {
  @prop()
  public name: string;

  @prop()
  public size: number;

  @prop()
  public key: string;

  @prop()
  public url: string;

  @prop({ type: Schema.Types.ObjectId, ref: 'Item' })
  public itemID: string;

  @prop({ default: Date.now() })
  public createdAt?: Date;
}

export const Image = getModelForClass(ImageModel);