import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../lib/mongodb';
import DealMemo from '../../../../models/deal-memo';
import { Band } from "../../../../models/band";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method !== 'POST') return;

    await connect();

    const deal = await DealMemo.findOne({ dealId: body.dealId });
    if (!deal) {
        return res.status(404).json({ success: false, error: { "message": "No deal memo found!" } });
    }

    const band = new Band(body.Band);
    await band.save();

    deal.bandid = band._id;
    await deal.save();
}