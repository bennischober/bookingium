import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connect } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    const registerData = {
        email: body.email,
        password: body.password,
    };

    if (method !== "POST") return;

    await connect();

    const user = await User.findOne({ email: registerData.email });
    if(!user) return res.status(404).json({ success: false, error: "User not found" });

    if(!bcrypt.compareSync(registerData.password, user.password)) return res.status(401).json({ success: false, error: "Password incorrect" });

    res.status(200).json({ success: true, user: user });
};
