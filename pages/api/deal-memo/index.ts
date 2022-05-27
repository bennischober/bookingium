import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    switch (method) {
        case 'GET':
            if (!userid) return res.status(403).json({ success: true, data: { message: "Access not granted!" } });
            try {
                // use populated data
                // currently no error handling, because i would get a warning, if nothing is returned in the api call
                const dt = await DealMemo.find({ 'dm.userid': userid }).populate('bandid').exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                // send unpopulated data, if population error occurs
                const dealMemos = await DealMemo.find({}); // get all entries
                return res.status(200).json({ success: true, data: dealMemos });
            }
        case 'POST':
            try {
                const dealMemo = await DealMemo.create(req.body); // create new db entry
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return res.status(500).json({ success: false, data: error });
            }
        default:
            return res.status(400).json({ success: false, data: { "message": "HTTP Method not found!" } });
    }
}
