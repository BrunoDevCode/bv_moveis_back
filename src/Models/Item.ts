import { Schema } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { User } from './User';

class ItemModel {
    @prop({ required: true })
    public title!: string;

    @prop()
    public description?: string;

    @prop({ type: Schema.Types.ObjectId, ref: 'User' })
    public userID!: string;

    @prop({ default: Date.now() })
    public created_at?: Date;
}

export const Item = getModelForClass(ItemModel);