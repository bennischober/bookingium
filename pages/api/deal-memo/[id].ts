import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';
import { handleAPIError, throwAPIError } from "../../../utils/appHandles";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method
    } = req;

    await connect();

    // also secure this endpoint with a userid!

    // id of the deal memo is required, only progress if available
    if (!id) return throwAPIError(res, "Bad request. Some parameters are missing!", 400);

    switch (method) {
        case 'GET':
            try {
                // register schema/model if its not already registered
                require('../../../models/band');
                require('../../../models/venue');
                require('../../../models/lopro');
                require('../../../models/hotel');

                // get specific item
                // Note: if populate('foreignDoc') id does not exist, it returns null => no error is thrown!
                const dealMemo = await DealMemo.findOne({ dealId: id }).populate('bandid').populate('venueid').populate('loproid').populate('hotelid').exec();
                if (!dealMemo) {
                    return res.status(404).json({ success: false, data: { error: `No data found for the id ${id}!` } });
                }
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return handleAPIError(res, error);
            }
        case 'PUT':
            try {
                // update specific item
                const dealMemo = await DealMemo.findByIdAndUpdate(id, req.body.data, {
                    new: true,
                    runValidators: true,
                });
                if (!dealMemo) {
                    return throwAPIError(res, "No deal memo found!", 404);
                }
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return handleAPIError(res, error);
            }
        case 'DELETE':
            try {
                // delete specific item
                const dealMemo = await DealMemo.findByIdAndDelete(id);
                if (!dealMemo) {
                    return throwAPIError(res, "No deal memo found!", 404);
                }
                return res.status(200).json({ success: true, data: {} });
            }
            catch (error) {
                return handleAPIError(res, error);
            }
        default:
            return throwAPIError(res, "HTTP Method not found!", 400);
    }
}