import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "@/types/errors";
import { Person } from "@/models/person";
import { connect } from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query, headers: { authorization } } = req;

    await connect();

    if (!authorization) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                const dt = await Person.find(query).exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res, 405, "HTTP Method Not Allowed").throw();
    }
}
