import mongoose from 'mongoose';
import dayjs from 'dayjs';

const dealMemoSchema = new mongoose.Schema({
    dealId: {
        type: String,
        required: true,
        unique: true,
    },
    deal: { type: String, required: true },
    date: { type: String, required: true },
    price: { type: Number },
    posters: { type: Number },
    notes: { type: String },
    references: {
        bandid: { type: String, required: true },
        venueid: { type: String }, // equals location
        loproid: { type: String }, // equals promoter
        hotelid: { type: String },
    },
    dm: {
        userid: { type: String, required: true },
        created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
        edited: { type: String }
    }
}); // , { collection: 'dealMemo' }

export default mongoose.models.DealMemo || mongoose.model('DealMemo', dealMemoSchema);
