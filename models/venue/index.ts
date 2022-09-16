import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IDm } from '../modelTypes';
import { ODm } from '../modelObjects';
import { ICompany } from '../company';

const VenueSchema = new Schema({
    venueid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    capacity: { type: Number },
    notes: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    dm: ODm,
});

interface _Venue {
    name: string;
    capacity: number;
    notes: string;
}

export interface Venue extends _Venue {
    company: Types.ObjectId;
}

export interface PVenue extends _Venue {
    company: ICompany;
}

export interface IVenue extends Document, Venue {
    venueid: string;
    dm: IDm;
}
export const Venue: Model<IVenue> = models.Venue || model<IVenue>('Venue', VenueSchema);
