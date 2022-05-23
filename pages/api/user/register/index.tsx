import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";
import mongoose from "mongoose";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    const registerData = {
        _id: new mongoose.Types.ObjectId(),
        userid: uuidv4(),
        name: body.name,
        email: body.email,
        password: body.password,
        log: {
            created: dayjs().format(),
        },
    };

    await connect();

    switch (method) {
        case "POST":
            try {
                const user = await User.create(registerData);
                if (!user)
                    return res
                        .status(404)
                        .json({ success: false, error: "User not found" });
                res.status(200).json({ success: true, user: user });
            } catch (err) {
                res.status(500).json({ success: false, error: err });
            }
            break;

        default:
            res.status(409).json({ success: false, user: registerData });
            break;
    }
};
