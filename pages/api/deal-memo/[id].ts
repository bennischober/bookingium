import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method
    } = req;

    await connect();

    // also secure this endpoint with a userid!

    // id of the deal memo is required, only progress if available
    if (!id) return res.status(400).json({ success: false, data: { error: "Bad request. Some parameters are missing!" } });

    switch (method) {
        case 'GET':
            try {
                // get specific item
                const dealMemo = await DealMemo.findOne({ dealId: id });
                if (!dealMemo) {
                    return res.status(404).json({ success: false, data: { error: `No data found for the id ${id}!` } });
                }
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return res.status(500).json({ success: false, error: error });
            }
        case 'PUT':
            try {
                // update specific item
                const dealMemo = await DealMemo.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!dealMemo) {
                    return res.status(404).json({ success: false, error: { "message": "No deal memo found!" } });
                }
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return res.status(500).json({ success: false, error: error });
            }
        case 'DELETE':
            try {
                // delete specific item
                const dealMemo = await DealMemo.findByIdAndDelete(id);
                if (!dealMemo) {
                    return res.status(404).json({ success: false, error: { "message": "No deal memo found!" } });
                }
                return res.status(200).json({ success: true, data: {} });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: error });
            }
        default:
            return res.status(400).json({ success: false, error: { "message": "HTTP Method not found!" } });
    }
}