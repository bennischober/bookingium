import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import { Person } from "../../../models/person";
import { ApiError } from '../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                const dt = await Person.find({ 'userid': userid }).exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'POST':
            try {
                const person = await Person.create(req.body.data);
                return res.status(200).json({ success: true, data: person });
            }
            catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res, 400, "HTTP Method not found!").throw();
    }
}
