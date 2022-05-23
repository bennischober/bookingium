import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import { Band } from "../../../models/band";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query: { userid } } = req;

    await connect();

    switch (method) {
        case 'GET':
            try {
                // send all bands for user
                if (userid) {
                    Band.find({ 'dm.userid': userid }).exec((err, bands) => {
                        if (err) {
                            return res.status(500).json({ success: false, error: err });
                        }
                        return res.status(200).json({ success: true, data: bands });
                    });
                }

                // no specific data found => send all bands
                const bands = await Band.find({});
                res.status(200).json({ success: true, data: bands });
            } catch (error) {
                res.status(500).json({ success: false, error: error });
            }
            break;
        default:
            res.status(400).json({ success: false, error: { "message": "HTTP Method not found!" } });
            break;
    }
}
