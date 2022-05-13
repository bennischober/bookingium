import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await connect();

    switch (method) {
        case 'GET':
            try {
                const dealMemos = await DealMemo.find({}); // get all entries
                res.status(200).json({ success: true, data: dealMemos });
            } catch (error) {
                res.status(500).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                const dealMemo = await DealMemo.create(req.body); // create new db entry
                res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                res.status(500).json({ success: false, error: error });
            }

            break;

        default:
            res.status(400).json({ success: false, error: { "message": "HTTP Method not found!" } });
            break;
    }
}