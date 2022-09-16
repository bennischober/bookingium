import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { ICompany } from '../company';
import { ODm } from '../modelObjects';
import { IDm } from '../modelTypes';

const HotelSchema = new Schema({
    hotelid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    notes: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    dm: ODm,
});

interface _Hotel {
    name: string;
    notes: string;
}

export interface Hotel extends _Hotel {
    company: Types.ObjectId;
}

export interface PHotel extends _Hotel {
    company: ICompany;
}

export interface IHotel extends Document, Hotel {
    hotelid: string;
    dm: IDm;
}

export const Hotel: Model<IHotel> = models.Hotel || model<IHotel>('Hotel', HotelSchema);
