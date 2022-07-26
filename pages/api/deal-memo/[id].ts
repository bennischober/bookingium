import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';
import { ApiError } from '../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        method
    } = req;

    await connect();

    // also secure this endpoint with a userid!

    // id of the deal memo is required, only progress if available
    if (!id) return new ApiError(res, 400, "Bad request. Some parameters are missing!").throw();

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
                    return new ApiError(res, 404, `No data found for the id ${id}!`).throw();
                }
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'PUT':
            try {
                // update specific item
                const dealMemo = await DealMemo.findByIdAndUpdate(id, req.body.data, {
                    new: true,
                    runValidators: true,
                });
                if (!dealMemo) {
                    return new ApiError(res, 404, "No deal memo found!").throw();
                }
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'DELETE':
            try {
                // delete specific item
                const dealMemo = await DealMemo.findByIdAndDelete(id);
                if (!dealMemo) {
                    return new ApiError(res, 404, "No deal memo found!").throw();
                }
                return res.status(200).json({ success: true, data: {} });
            }
            catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res, 400, "HTTP Method not found!").throw();
    }
}