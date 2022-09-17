import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IDm } from '../modelTypes';
import { ODm } from '../modelObjects';

// for company with many persons: https://www.mongodb.com/community/forums/t/how-to-reference-and-populate-object-embedded-in-another-collection/169052
// https://mongoosejs.com/docs/populate.html#populate_multiple_documents

const BandSchema: Schema = new Schema({
    bandid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    genre: { type: String},
    notes: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'Person', required: true }],
    dm: ODm,
});

export interface Band {
    name: string;
    genre: string;
    notes: string;
    company: Types.ObjectId;
    members: Types.ObjectId[];
}

export interface IBand extends Document, Band {
    bandid: string;
    dm: IDm;
}

export const Band: Model<IBand> = models.Band || model<IBand>('Band', BandSchema);
