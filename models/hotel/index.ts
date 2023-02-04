import { Document, model, Model, models, Schema } from 'mongoose';
import { OAddress, OContact, ODm } from '../modelObjects';
import { IAddress, IContact, IDm } from '../modelTypes';

const HotelSchema = new Schema({
    name: { type: String, required: true },
    notes: { type: String, default: '' },
    address: OAddress,
    contact: OContact,
    ...ODm,
});

export interface Hotel {
    name: string;
    notes: string;
    contact: IContact;
    address: IAddress;
}

export interface IHotel extends Document, Hotel, IDm { }

export const Hotel: Model<IHotel> = models.Hotel || model<IHotel>('Hotel', HotelSchema);
