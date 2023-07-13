import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../lib/mongodb';
import { Workplace } from "../../../../models/workplace";
import { ApiError } from '../../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid, id }, } = req;

    await connect();

    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'POST':
            try {
                const workplace = await Workplace.create(req.body.data);
                return res.status(200).json({ success: true, data: workplace });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'GET':
            try {
                const u = await Workplace.findOne({ 'userid': userid });
                if (!u) return new ApiError(res).throwSpecific('access_denied');
                return res.status(200).json({ success: true, data: u });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res, 400, "HTTP Method not found!").throw();
    }
}