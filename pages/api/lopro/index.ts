import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import Lopro from "../../../models/lopro";
import { ApiError } from "../../../types/errors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    switch (method) {
        case 'GET':
            if (!userid) return new ApiError(res).throwSpecific('access_denied');
            try {
                const dt = await Lopro.find({ 'dm.userid': userid }).exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'POST':
            try {
                const lopro = await Lopro.create(req.body.data);
                return res.status(200).json({ success: true, data: lopro });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res, 400, "HTTP Method not found!").throw();
    }
}
