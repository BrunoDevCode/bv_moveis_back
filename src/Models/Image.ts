import { Schema } from 'mongoose';
import aws from 'aws-sdk';
import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { prop, getModelForClass, pre, post } from '@typegoose/typegoose';
import { APP_URL, BUCKET_NAME, STORAGE_TYPE } from '../config/env';

const s3 = new aws.S3();

@pre<ImageModel>('save', function () {
  console.log(this.key)
  if (!this.url) {
    this.url = `${APP_URL}/files/${this.key}`;
    console.log(`> Salvo em ${APP_URL}`)
  }
})

@post<ImageModel>('findOneAndDelete', image => {
  if (STORAGE_TYPE === 's3') {
    return s3
      .deleteObject({
        Bucket: BUCKET_NAME,
        Key: `${image.key}`,
      })
      .promise()
      .then(() => {
        console.log('> Sucessful in remove the image!');
      })
      .catch(response => {
        console.log('> Error in remove image');
        console.log(`> ${response.error}`);
      });
  } else {
    if (!image.key) console.log('> Key of image not exists');

    return promisify(fs.unlink)(
      resolve(__dirname, '..', '..', 'tmp', 'uploads', `${image.key}`)
    );
  }
})

class ImageModel {
  @prop()
  public name: string;

  @prop()
  public size: number;

  @prop()
  public key: String;

  @prop()
  public url: string;

  @prop({ type: Schema.Types.ObjectId, ref: 'Item' })
  public itemID: string;

  @prop({ default: Date.now() })
  public createdAt?: Date;
}

export const Image = getModelForClass(ImageModel);