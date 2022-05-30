import mongoose from 'mongoose';
import dayjs from 'dayjs';

const loproSchema = new mongoose.Schema({
    loproid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    phone: { type: String },
    mobilePhone: { type: String },
    email: { type: String, required: true },
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
    }
});

export interface ILopro extends Document {
    loproid: string;
    name: string;
    phone: string;
    mobilePhone: string;
    email: string;
    notes: string;
    company: {
        name: string;
        vatNumber: string;
        ustNumber: string;
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
    };
    dm: {
        userid: string;
        created: string;
        edited: string;
    };
}

export default mongoose.models.Lopro || mongoose.model('Lopro', loproSchema);
