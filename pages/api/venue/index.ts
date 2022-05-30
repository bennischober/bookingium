import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import Venue from "../../../models/venue";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    switch (method) {
        case 'GET':
            if (!userid) return res.status(403).json({ success: true, data: { message: "Access not granted!" } });
            try {
                // send populated data => needed in deal memo list
                const dt = await Venue.find({ 'dm.userid': userid }).exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return res.status(500).json({ success: true, data: error });
            }
        case 'POST':
            try {
                const venue = await Venue.create(req.body.data); // create new db entry
                return res.status(200).json({ success: true, data: venue });
            } catch (error) {
                return res.status(500).json({ success: false, data: error });
            }
        default:
            return res.status(400).json({ success: false, data: { "message": "HTTP Method not found!" } });
    }
}
