import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";
import { ApiError } from "../../../../types/errors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { email },
        method,
    } = req;

    if(!email) return new ApiError(res).throwSpecific('no_data_found', "Email not found!");

    await connect();

    switch (method) {
        case "GET":
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return res.status(200).json({ success: true, user: user });
                }
                return new ApiError(res).throwSpecific('data_conflict', "User exists already!");
            } catch (err) {
                return new ApiError(res, 500).handle(err);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
};
