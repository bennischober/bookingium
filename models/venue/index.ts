import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IDm } from '../modelTypes';
import { ODm } from '../modelObjects';

const VenueSchema = new Schema({
    venueid: {
        type: String,
        required: true,
        unique: true,
        // refers to #118
        index: true,
    },
    name: { type: String, required: true },
    capacity: { type: Number },
    notes: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    members: [{
        identifier: { type: String, default: '' },
        person: { type: Schema.Types.ObjectId, ref: 'Person', default: null },
    }],
    dm: ODm,
});

export interface Venue {
    name: string;
    capacity: number;
    notes: string;
    company: Types.ObjectId;
    // closes #367
    members: {
        identifier: string;
        person: Types.ObjectId;
    }[];
}


export interface IVenue extends Document, Venue {
    venueid: string;
    dm: IDm;
}
export const Venue: Model<IVenue> = models.Venue || model<IVenue>('Venue', VenueSchema);
