import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { ODm } from '../modelObjects';
import { IDm } from '../modelTypes';

const dealMemoSchema = new Schema({
    dealId: {
        type: String,
        required: true,
        unique: true,
    },
    deal: { type: String, required: true },
    date: { type: String, required: true },
    fee: { type: Number },
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
    venueid: { type: Schema.Types.ObjectId, ref: 'Venue' }, // equals location
    hotelid: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    dm: ODm,
}); // , { collection: 'dealMemo' }

export interface IDealMemo extends Document {
    dealId: string;
    deal: string;
    date: string;
    fee: number;
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
    dm: IDm;
}

export const DealMemo: Model<IDealMemo> = models.DealMemo || model<IDealMemo>('DealMemo', dealMemoSchema);
