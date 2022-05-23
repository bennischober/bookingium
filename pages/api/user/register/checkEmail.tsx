import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { email },
        method,
    } = req;

    await connect();

    switch (method) {
        case "GET":
            try {
                const user = await User.findOne({ email: email });
                if (!user)
                    return res.status(200).json({ success: true, user: user });
                res.status(409).json({ success: false, user: user });
            } catch (err) {
                res.status(500).json({ success: false, error: err });
            }
            break;

        default:
            res.status(409).json({ success: false, email: email });
            break;
    }
};
