import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import { Venue } from "../../../models/venue";
import { ApiError } from "../../../types/errors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                // send populated data => needed in deal memo list
                const dt = await Venue.find({ 'userid': userid }).exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'POST':
            try {
                const venue = await Venue.create(req.body.data);
                return res.status(200).json({ success: true, data: venue });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
}
