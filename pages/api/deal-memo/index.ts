import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';
import Band from "../../../models/band";
import mongoose from "mongoose";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await connect();

    /*
    TESTING:

        const b = new Band({
        _id: new mongoose.Types.ObjectId(),
        bandid: 'dc6d3f1d-7605-4c3f-902c-ea46517ae642',
        name: 'test',
        notes: "test notes",
        dm: {
            userid: 'bb231c4e-277e-4a92-b8cf-79b385259a03',
            created: '2020-01-01T00:00:00Z[UTC]',
            edited: '2020-01-01T00:00:00Z[UTC]'
        }
    });

    b.save();

    const dm = await DealMemo.create({
        dealId: '471ac508-c3f7-4c99-be42-75d3dc1dfa5c', deal: 'deal text, lol', date: "some random not date date", price: 12000, posters: 2500, notes: "some shitty notes",
        bandid: b._id,
        dm: {
            userid: 'bb231c4e-277e-4a92-b8cf-79b385259a03',
            created: '2020-01-01T00:00:00Z[Z]',
            edited: '2020-01-01T00:00:00Z[Z]',
        }
    });

    DealMemo.findOne().populate('bandid').exec((err, dealMemo) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(dealMemo);
    });
    */

    switch (method) {
        case 'GET':
            try {
                // use populated data
                DealMemo.find({}).populate('bandid').exec((err, dealMemos) => {
                    if (err) {
                        return res.status(500).json({ success: false, error: err });
                    }
                    res.status(200).json({ success: true, data: dealMemos });
                });

                // or standalone data?
                // const dealMemos = await DealMemo.find({}); // get all entries
                // res.status(200).json({ success: true, data: dealMemos });
            } catch (error) {
                res.status(500).json({ success: false, error: error });
            }
            break;

        case 'POST':
            // could also add some if statements to create referenced data here also => only 1 request instead of max. 4
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