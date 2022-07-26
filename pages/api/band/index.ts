import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import { Band } from "../../../models/band";
import { ApiError } from "../../../types/errors";

// add this in future: https://nextjs.org/docs/api-routes/response-helpers#adding-typescript-types

// also secure complete endpoint with userid

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    switch (method) {
        case 'GET':
            if (!userid) return new ApiError(res).throwSpecific('access_denied');
            try {
                // send all bands for user
                // also no error handling if find.exec() throws an error!
                const data = await Band.find({ 'dm.userid': userid }).exec();
                return res.status(200).json({ success: true, data: data });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'POST':
            try {
                const band = await Band.create(req.body.data); // create new db entry
                return res.status(200).json({ success: true, data: band });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
}
