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
            streetNumber: { type: Number },
            addressSuffix: { type: String },
            zipCode: { type: Number },
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

export interface IVenue extends Document {
    venueid: string;
    venue: string;
    capacity: number;
    notes: string;
    company: {
        name: string;
        vatNumber: string;
        ustNumber: string;
        address: {
            street: string;
            streetNumber: number;
            addressSuffix: string;
            zipCode: number;
            city: string;
            state: string;
            country: string;
            countryCode: string;
        };
        contact: {
            phone: string;
            mobilePhone: string;
            email: string;
            homepage: string;
        };
    };
    dm: {
        userid: string;
        created: string;
        edited: string;
    };
}

export default mongoose.models.Venue || mongoose.model('Venue', venueSchema);