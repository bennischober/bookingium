import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connect } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";
import { ApiError } from "../../../../types/errors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    const registerData = {
        email: body.username,
        password: body.password,
    };

    await connect();

    switch (method) {
        case "POST":
            try {
                const user = await User.findOne({ email: registerData.email });
                if (!user) {
                    return new ApiError(res).throwSpecific(
                        "no_data_found",
                        "User not found!"
                    );
                }
                if (!bcrypt.compareSync(registerData.password, user.password)) {
                    return new ApiError(res).throwSpecific(
                        "access_not_authorized",
                        "Wrong login credentials!"
                    );
                }

                return res.status(200).json({ success: true, user: user });
            } catch (err) {
                return new ApiError(res, 500).handle(err);
            }
        default:
            return new ApiError(res).throwSpecific("http_method_not_found");
    }
};
