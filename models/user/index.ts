import mongoose from 'mongoose';
import dayjs from 'dayjs';

const userSchema = new mongoose.Schema({
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
}); // , { collection: 'users' }

export default mongoose.models.User || mongoose.model('User', userSchema);
