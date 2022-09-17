import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../lib/mongodb';
import { DealMemo } from '../../../../models/deal-memo';
import { ApiError } from '../../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id, userid },
        method
    } = req;

    await connect();

    // id of the deal memo is required, only progress if available
    if (!id) return new ApiError(res).throwSpecific('missing_request_parameters');
    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                // register schema/model if its not already registered
                require("../../../../models/band");
                require("../../../../models/venue");
                require("../../../../models/hotel");

                // get specific item
                // Note: if populate('foreignDoc') id does not exist, it returns null => no error is thrown!
                const dealMemo = await DealMemo.findOne({ dealId: id }).populate('bandid').populate('venueid').populate('hotelid').exec();
                if (!dealMemo) {
                    return new ApiError(res, 404, `No data found for the id ${id}!`).throw();
                }
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'PUT':
            try {
                // this updates only the given data in body
                const dealMemo = await DealMemo.updateOne({ dealId: id }, { $set: req.body.data }, { runValidators: true });
                if (!dealMemo) {
                    return new ApiError(res).throwSpecific('no_data_found');
                }
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'DELETE':
            try {
                // delete specific item
                const dealMemo = await DealMemo.deleteOne({ dealId: id });
                if (!dealMemo) {
                    return new ApiError(res).throwSpecific('no_data_found');
                }
                return res.status(200).json({ success: true, data: dealMemo });
            }
            catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
}