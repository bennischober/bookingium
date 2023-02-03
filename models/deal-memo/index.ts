import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { ODm } from '../modelObjects';
import { IDm } from '../modelTypes';

const DealMemoSchema = new Schema({
    dealid: {
        type: String,
        required: true,
        unique: true,
        // refers to #118
        index: true,
    },
    deal: { type: String, required: true },
    date: { type: Date, required: true },
    ticketPriceVVK: { type: Number },
    ticketPriceAK: { type: Number },
    posters: { type: Number },
    status: { type: String },
    notes: { type: String },
    lopro: {
        person: { type: Schema.Types.ObjectId, ref: 'Person' },
        company: { type: Schema.Types.ObjectId, ref: 'Company' },
    },
    bandid: { type: Schema.Types.ObjectId, ref: 'Band', required: true },
    venueid: { type: Schema.Types.ObjectId, ref: 'Venue', default: null },
    hotelid: { type: Schema.Types.ObjectId, ref: 'Hotel', default: null },
    dm: ODm,
});

export interface DealMemo {
    deal: string;
    date: Date;
    ticketPriceVVK: number;
    ticketPriceAK: number;
    posters: number;
    status: string;
    notes: string;
    lopro: {
        person: Types.ObjectId;
        company: Types.ObjectId;
    },
    bandid: Types.ObjectId;
    venueid: Types.ObjectId;
    hotelid: Types.ObjectId | null;
}

export interface IDealMemo extends Document, DealMemo {
    dealid?: string; // this has to change!
    dm: IDm;
}

export const DealMemo: Model<IDealMemo> = models.DealMemo || model<IDealMemo>('DealMemo', DealMemoSchema);
