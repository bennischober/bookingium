import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import { ApiError } from "../../../types/errors";
import { Itinerary } from "../../../models/itinerary";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid, memoid } } = req;

    await connect();

    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                // get specific based on memoid
                if (memoid) {
                    const data = await Itinerary.findOne({ 'userid': userid, 'dealMemoId': memoid }).exec();
                    console.log(data);
                    return res.status(200).json({ success: true, data: data });
                }
                // send all bands for user
                const data = await Itinerary.find({ 'userid': userid }).exec();
                return res.status(200).json({ success: true, data: data });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'POST':
            try {
                const itinerary = await Itinerary.create(req.body.data);
                return res.status(200).json({ success: true, data: itinerary });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
}
