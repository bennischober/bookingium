import { Document, model, Model, models, Schema } from 'mongoose';
import { OAddress, OContact, ODm } from '../modelObjects';
import { IAddress, IContact, IDm } from '../modelTypes';

const HotelSchema = new Schema({
    hotelid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    notes: { type: String },
    address: OAddress,
    contact: OContact,
    dm: ODm,
});

export interface Hotel {
    name: string;
    notes: string;
    contact: IContact;
    address: IAddress;
}

export interface IHotel extends Document, Hotel {
    hotelid: string;
    dm: IDm;
}

export const Hotel: Model<IHotel> = models.Hotel || model<IHotel>('Hotel', HotelSchema);
