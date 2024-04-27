import bcrypt from "bcryptjs";
import { handler } from "@/handler";
import { User } from "@/models/user";
import { validateBody } from "@/utils/appHandles";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const POST = handler(async (req, token, context) => {
    const body = await validateBody(req);

    const loginData = {
        email: body.email,
        password: body.password,
    }

    const user = await User.findOne({ email: loginData.email }).exec();

    if (!user) {
        return NextResponse.json({ success: false, error: "User not found" });
    }

    var passwordCheck = await bcrypt.compare(loginData.password, user.password);

    if (!passwordCheck) {
        return NextResponse.json({ success: false, error: "Password incorrect" });
    }

    return NextResponse.json({ success: true, data: user });
});
