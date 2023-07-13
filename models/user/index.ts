import { Document, model, Model, models, Schema } from 'mongoose';
import dayjs from 'dayjs';

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
    lastLogin: { type: String },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.virtual('workplaces', {
    ref: 'Workplace',
    localField: '_id',
    foreignField: 'users',
});

export interface User {
    name: string;
    email: string;
    password: string;
}

export interface IUser extends Document, User {
    role: string;
    created: string;
    lastLogin: string;
}

export const User: Model<IUser> = models.User || model<IUser>('User', userSchema);
