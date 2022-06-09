import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { ICompany, IDm } from './../modelTypes';
import { OCompany } from '../modelObjects';

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
    company: OCompany,
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
    company: ICompany;
    dm: IDm;
}

export default mongoose.models.Lopro || mongoose.model('Lopro', loproSchema);
