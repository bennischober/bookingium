import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IDm } from '../modelTypes';
import { ODm } from '../modelObjects';

const ItinerarySchema: Schema = new Schema({
    notes: { type: String, default: '' },
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    dealMemoId: { type: Schema.Types.ObjectId, ref: 'DealMemo', required: true },
    getIn: { type: String, default: '' },
    loadIn: { type: String, default: '' },
    soundCheckMainAct: { type: String, default: '' },
    soundCheckSupport: { type: String, default: '' },
    dinner: { type: String, default: '' },
    doors: { type: String, default: '' },
    showTimeMainAct: { type: String, default: '' },
    showTimeSupport: { type: String, default: '' },
    curfewStage: { type: String, default: '' },
    curfewVenue: { type: String, default: '' },
    showLength: { type: String, default: '' },
    ...ODm,
});

export interface Itinerary {
    notes: string;
    venueId: Types.ObjectId;
    hotelId: Types.ObjectId;
    dealMemoId: Types.ObjectId;
    getIn: string;
    loadIn: string;
    soundCheckMainAct: string;
    soundCheckSupport: string;
    dinner: string;
    doors: string;
    showTimeMainAct: string;
    showTimeSupport: string;
    curfewStage: string;
    curfewVenue: string;
    showLength: string;
}

export interface IItinerary extends Document, Itinerary, IDm { }

export const Itinerary: Model<IItinerary> = models.Itinerary || model<IItinerary>('Itinerary', ItinerarySchema);
