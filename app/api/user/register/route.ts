import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { handler } from "@/handler";
import { validateBody } from "@/utils/appHandles";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const POST = handler(async (req, token, context) => {
    const body = await validateBody(req);

    const registerData = {
        userid: uuidv4(),
        name: body.name,
        email: body.email,
        password: body.password,
        created: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    }

    const user = await User.create(registerData);

    if (!user) {
        return NextResponse.json(
            { success: false, error: "User could not be created" },
            { status: 400 });
    }

    return NextResponse.json({ success: true, data: user });
});