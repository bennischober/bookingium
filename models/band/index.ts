import mongoose from 'mongoose';
import dayjs from 'dayjs';
const { Schema } = mongoose;

const bandSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    bandid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    notes: { type: String },
    company: {
        name: { type: String },
        vatNumber: { type: String },
        ustNumber: { type: String },
        address: {
            street: { type: String },
            streetNumber: { type: String },
            addressSuffix: { type: String },
            zipCode: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            countryCode: { type: String },
        },
        contact: {
            phone: { type: String },
            mobilePhone: { type: String },
            email: { type: String },
            homepage: { type: String },
        },
    },
    members: [
        {
            name: { type: String },
            email: { type: String },
            phone: { type: String },
        }
    ],
    dm: {
        userid: { type: String, required: true },
        created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
        edited: { type: String }
    },
});

export default mongoose.models.Band || mongoose.model('Band', bandSchema);
