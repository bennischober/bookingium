import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import { ApiError } from '../../../types/errors';
import { User } from "../../../models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                const u = await User.findById(userid);
                if (!u) return new ApiError(res).throwSpecific('no_data_found');
                return res.status(200).json({ success: true, data: u });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
    }
}
