import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../../lib/mongodb';
import { Workplace } from "../../../../../models/workplace";
import { ApiError } from '../../../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid, id }, } = req;

    await connect();

    if (!userid) return new ApiError(res).throwSpecific('access_denied');
    if (!id) return new ApiError(res).throwSpecific('missing_request_parameters');

    switch (method) {
        case 'GET':
            try {
                const u = await Workplace.findOne({ 'userid': userid });
                if (!u) return new ApiError(res).throwSpecific('access_denied');
                return res.status(200).json({ success: true, data: u });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'PUT':
            try {
                const wp = await Workplace.updateOne({ _id: id }, { $set: req.body.data }, { runValidators: true }).exec();
                if (!wp) return new ApiError(res).throwSpecific('no_data_found');
                return res.status(200).json({ success: true, data: wp });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
    }
}