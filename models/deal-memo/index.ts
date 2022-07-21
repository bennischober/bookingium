import mongoose, { Document } from 'mongoose';
import dayjs from 'dayjs';

const dealMemoSchema = new mongoose.Schema({
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
    bandid: { type: mongoose.Schema.Types.ObjectId, ref: 'Band', required: true },
    venueid: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }, // equals location
    loproid: { type: mongoose.Schema.Types.ObjectId, ref: 'Lopro' }, // equals promoter
    hotelid: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    dm: {
        userid: { type: String, required: true, index: true },
        created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
        edited: { type: String }
    }
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
    bandid: mongoose.Types.ObjectId;
    venueid: mongoose.Types.ObjectId;
    loproid: mongoose.Types.ObjectId;
    hotelid: mongoose.Types.ObjectId | null;
    dm: {
        userid: string;
        created: string;
        edited: string;
    };
}

export default mongoose.models.DealMemo || mongoose.model('DealMemo', dealMemoSchema);
