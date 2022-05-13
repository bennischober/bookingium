import mongoose from 'mongoose';
import dayjs from 'dayjs';

const venueSchema = new mongoose.Schema({
    venueid: {
        type: String,
        required: true,
        unique: true,
    },
    venue: { type: String, required: true },
    capacity: { type: Number },
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
    dm: {
        userid: { type: String, required: true },
        created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
        edited: { type: String }
    },
});

export default mongoose.models.Venue || mongoose.model('Venue', venueSchema);