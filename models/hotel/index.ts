import mongoose from 'mongoose';
import dayjs from 'dayjs';

const hotelSchema = new mongoose.Schema({
    hotelid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    notes: { type: String },
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
    dm: {
        userid: { type: String, required: true },
        created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
        edited: { type: String }
    }
});

export interface IHotel extends Document {
    hotelid: string;
    name: string;
    notes: string;
    address: {
        street: string;
        streetNumber: string;
        addressSuffix: string;
        zipCode: string;
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
    dm: {
        userid: string;
        created: string;
        edited: string;
    };
}

export default mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);
