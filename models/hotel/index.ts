import mongoose from 'mongoose';
import { OCompany, ODm } from '../modelObjects';
import { ICompany, IDm } from '../modelTypes';

const hotelSchema = new mongoose.Schema({
    hotelid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    notes: { type: String },
    company: OCompany,
    dm: ODm,
});

export interface IHotel extends Document {
    hotelid: string;
    name: string;
    notes: string;
    company: ICompany;
    dm: IDm;
}

export default mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);
