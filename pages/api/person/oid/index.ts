import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../lib/mongodb';
import { Person } from "../../../../models/person";
import { ApiError } from '../../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid, ids, fields } } = req;

    await connect();

    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                // send only specific people and optionally with specific fields
                if (ids) {
                    const persons = await Person.find({ _id: { $in: ids } }, fields).exec();
                    if (!persons) {
                        return new ApiError(res, 404, `No data found for the ids!`).throw();
                    }
                    return res.status(200).json({ success: true, data: persons });
                }

                const dt = await Person.find({ _id: userid }).exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res, 400, "HTTP Method not found!").throw();
    }
}
