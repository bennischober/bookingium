import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query: { userid } } = req;

    await connect();

    switch (method) {
        case 'GET':
            try {
                // use populated data
                DealMemo.find({ 'dm.userid': userid }).populate('bandid').exec((err, dealMemos) => {
                    if (err) {
                        return res.status(500).json({ success: false, error: err });
                    }
                    console.log("you are here!");
                    return res.status(200).json({ success: true, data: dealMemos });
                });
            } catch (error) {
                // or standalone data?
                const dealMemos = await DealMemo.find({}); // get all entries
                return res.status(200).json({ success: true, data: dealMemos });

                // send all data instead of population error?
                //res.status(500).json({ success: false, error: error });
            }
            break;

        case 'POST':
            // could also add some if statements to create referenced data here also => only 1 request instead of max. 4
            try {
                const dealMemo = await DealMemo.create(req.body); // create new db entry
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, error: error });
            }

            break;

        default:
            res.status(400).json({ success: false, error: { "message": "HTTP Method not found!" } });
            break;
    }
}