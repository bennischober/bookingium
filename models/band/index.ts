import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IDm } from '../modelTypes';
import { ODm } from '../modelObjects';

const BandSchema: Schema = new Schema({
    bandid: {
        type: String,
        required: true,
        unique: true,
        // refers to #118
        index: true,
    },
    name: { type: String, required: true },
    genre: { type: String, default: '' },
    founded: { type: Date, default: null },
    notes: { type: String, default: '' },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'Person', required: true }],
    dm: ODm,
});

export interface Band {
    name: string;
    genre: string;
    founded?: Date;
    notes: string;
    company: Types.ObjectId;
    members: Types.ObjectId[];
}

export interface IBand extends Document, Band {
    bandid: string;
    dm: IDm;
}

export const Band: Model<IBand> = models.Band || model<IBand>('Band', BandSchema);
