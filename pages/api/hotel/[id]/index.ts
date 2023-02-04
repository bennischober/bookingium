import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../lib/mongodb';
import { Hotel } from "../../../../models/hotel";
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
                const hotel = await Hotel.findOne({ _id: id }).exec();
                if (!hotel) {
                    return new ApiError(res, 404, `No data found for the id ${id}!`).throw();
                }
                return res.status(200).json({ success: true, data: hotel });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'PUT':
            try {
                const hotel = await Hotel.updateOne({ _id: id }, { $set: req.body.data }, { runValidators: true, });
                if (!hotel) {
                    return new ApiError(res).throwSpecific('no_data_found');
                }
                return res.status(200).json({ success: true, data: hotel });
            } catch (error) {
                console.log(error, req.body.data);
                return new ApiError(res, 500).handle(error);
            }
        case 'DELETE':
            try {
                const hotel = await Hotel.deleteOne({_id: id});
                if (!hotel) {
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
