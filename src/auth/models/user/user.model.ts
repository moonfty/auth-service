import { Schema, model } from 'mongoose';
import * as mongoose from 'mongoose';


export enum WalletTypes {
    SOL = 'SOL',
    ETH = 'ETH',
}

export interface IUser {
    id: mongoose.Types.ObjectId;
    username: string
    n_token: string,
    wallet?: string,
    type?: WalletTypes
}

export interface IUserDocument extends IUser, Document {}

export const UserSchema: Schema<IUserDocument> = new Schema(
    {
        username: { type: String, required: true, unique: true },
        n_token: { type: String, required: true, unique: true },
        wallet: { type: String, required: false, unique: true },
        type: { type: String, enum: WalletTypes, required: false },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
            },
        },
    },
);

/*
UserSchema.index(
    {
        text: 'text',
    },
    { default_language: 'none' },
);
*/
const UserModel = model<IUserDocument>('User', UserSchema);
UserModel.createIndexes();

export default UserModel;
