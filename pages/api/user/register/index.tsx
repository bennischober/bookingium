import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    const registerData = {
        userid: uuidv4(),
        name: body.name,
        email: body.email,
        password: body.password,
        log: {
            created: dayjs().format(),
        },
    };

    if (method !== "POST") return;

    await connect();

    try {
        const user = await User.create(registerData);
        res.status(200).json({ success: true, user: user });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
};
