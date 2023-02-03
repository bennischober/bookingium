import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../lib/mongodb';
import { Band } from "../../../../models/band";
import { ApiError } from '../../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id, userid },
        method
    } = req;

    await connect();

    // id references the band
    if (!id) return new ApiError(res).throwSpecific('missing_request_parameters');
    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                const band = await Band.findOne({ bandid: id }).exec();
                if (!band) {
                    return new ApiError(res, 404, `No data found for the id ${id}!`).throw();
                }
                return res.status(200).json({ success: true, data: band });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'PUT':
            try {
                const band = await Band.updateOne({ bandid: id }, { $set: req.body.data }, { runValidators: true, });
                if (!band) {
                    return new ApiError(res).throwSpecific('no_data_found');
                }
                return res.status(200).json({ success: true, data: band });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'DELETE':
            try {
                const band = await Band.findByIdAndDelete(id);
                if (!band) {
                    return new ApiError(res).throwSpecific('no_data_found');
                }
                return res.status(200).json({ success: true, data: {} });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
}
