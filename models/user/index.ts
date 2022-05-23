import { Document, model, Model, models, Schema } from 'mongoose';
import dayjs from 'dayjs';

const userSchema: Schema = new Schema({
    _id: Schema.Types.ObjectId,
    userid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    log: {
        created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
        lastLogin: { type: String },
    }
});

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    userid: string;
    name: string;
    email: string;
    password: string;
    log: {
        created: string;
        lastLogin: string;
    };
}

export const User: Model<IUser> = models.User || model<IUser>('User', userSchema);
