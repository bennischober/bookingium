import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";
import mongoose from "mongoose";
import { ApiError } from "../../../../types/errors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    // check for  body.name, body.email, body.password and return, if not present?
    
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
                if (!user) {
                    return new ApiError(res).throwSpecific('no_data_found', "User not found!");
                }
                return res.status(200).json({ success: true, user: user });
            } catch (err) {
                return new ApiError(res, 500).handle(err);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
};
