import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { email },
        method,
    } = req;

    if (method !== "GET") return;

    await connect();

    try {
        const user = await User.findOne({ email: email });
        res.status(200).json({ success: true, user: user });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }

    res.status(409).json({ email: email });
};
