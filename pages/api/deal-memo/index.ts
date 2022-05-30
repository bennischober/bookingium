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
                // send populated data => needed in deal memo list
                const dt = await DealMemo.find({ 'dm.userid': userid }).populate('bandid').exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return res.status(500).json({ success: true, data: error });
            }
        case 'POST':
            try {
                const dealMemo = await DealMemo.create(req.body.data); // create new db entry
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return res.status(500).json({ success: false, data: error });
            }
        default:
            return res.status(400).json({ success: false, data: { "message": "HTTP Method not found!" } });
    }
}
