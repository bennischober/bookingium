import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import { Band } from "../../../models/band";

// add this in future: https://nextjs.org/docs/api-routes/response-helpers#adding-typescript-types

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    switch (method) {
        case 'GET':
            if (!userid) return res.status(403).json({ success: true, data: { error: "Access not granted!" } });
            try {
                // send all bands for user
                // also no error handling if find.exec() throws an error!
                const data = await Band.find({ 'dm.userid': userid }).exec();
                return res.status(200).json({ success: true, data: data });
            } catch (error) {
                return res.status(500).json({ success: false, data: error });
            }
        case 'POST':
            try {
                const band = await Band.create(req.body.data); // create new db entry
                return res.status(200).json({ success: true, data: band });
            } catch (error) {
                return res.status(500).json({ success: false, data: error });
            }
        default:
            return res.status(400).json({ success: false, error: { "message": "HTTP Method not found!" } });
    }
}
