import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { ODm } from '../modelObjects';
import { IDm } from '../modelTypes';

const DealMemoSchema = new Schema({
    deal: { type: String, required: true },
    date: { type: Date, required: true },
    ticketPriceVVK: { type: Number },
    ticketPriceAK: { type: Number },
    posters: { type: String },
    status: { type: String },
    notes: { type: String },
    amountOfPeople: { type: Number, default: 0 },
    roomInformation: { type: String, default: '' },
    performanceDuration: { type: String },
    performanceTime: { type: String },
    performanceInformation: { type: String },
    lopro: {
        person: { type: Schema.Types.ObjectId, ref: 'Person' },
        company: { type: Schema.Types.ObjectId, ref: 'Company' },
    },
    bandid: { type: Schema.Types.ObjectId, ref: 'Band', required: true },
    venueid: { type: Schema.Types.ObjectId, ref: 'Venue', default: null },
    hotelid: { type: Schema.Types.ObjectId, ref: 'Hotel', default: null },
    ...ODm,
});

export interface DealMemo {
    deal: string;
    date: Date;
    ticketPriceVVK: number;
    ticketPriceAK: number;
    posters: string;
    status: string;
    notes: string;
    amountOfPeople: number;
    roomInformation: string;
    performanceDuration: string;
    performanceTime: string;
    performanceInformation: string;
    lopro: {
        person: Types.ObjectId;
        company: Types.ObjectId;
    },
    bandid: Types.ObjectId;
    venueid: Types.ObjectId;
    hotelid: Types.ObjectId | null;
}

export interface IDealMemo extends Document, DealMemo, IDm { }

export const DealMemo: Model<IDealMemo> = models.DealMemo || model<IDealMemo>('DealMemo', DealMemoSchema);
