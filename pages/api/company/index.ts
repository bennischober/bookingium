import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import { Company } from "../../../models/company";
import { ApiError } from '../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                const dt = await Company.find({ 'userid': userid }).exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'POST':
            try {
                const company = await Company.create(req.body.data);
                return res.status(200).json({ success: true, data: company });
            }
            catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res, 400, "HTTP Method not found!").throw();
    }
}
