import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method
    } = req;

    await connect();

    switch (method) {
        case 'GET':
            try {
                const dealMemo = await DealMemo.findById(id); // get specific item
                if (!dealMemo) {
                    return res.status(404).json({ success: false, error: { "message": "No deal memo found!" } });
                }
                res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                res.status(500).json({ success: false, error: error });
            }
            break;
        case 'PUT':
            try {
                const dealMemo = await DealMemo.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                }); // update specific item
                if (!dealMemo) {
                    return res.status(404).json({ success: false, error: { "message": "No deal memo found!" } });
                }
                res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                res.status(500).json({ success: false, error: error });
            }
            break;
        case 'DELETE':
            try {
                const dealMemo = await DealMemo.findByIdAndDelete(id); // delete specific item
                if (!dealMemo) {
                    return res.status(404).json({ success: false, error: { "message": "No deal memo found!" } });
                }
                res.status(200).json({ success: true, data: {} });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error });
            }
            break;
        default:
            res.status(400).json({ success: false, error: { "message": "HTTP Method not found!" } });
            break;
    }
}