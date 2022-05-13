import mongoose from 'mongoose';
import dayjs from 'dayjs';

const loproSchema = new mongoose.Schema({
    loproid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
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
            email: { type: String },
            homepage: { type: String },
        },
    },
    dm: {
        userid: { type: String, required: true },
        created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
        edited: { type: String }
    }
});

export default mongoose.models.Lopro || mongoose.model('Lopro', loproSchema);
