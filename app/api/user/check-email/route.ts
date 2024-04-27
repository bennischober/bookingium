import { handler } from "@/handler";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface T {
    email: string;
}

export const GET = handler<T>(async (req, token, context) => {
    const user = await User.findOne({ email: context?.params.email }).exec();

    // good; user does not exist, thus this email is available
    if(!user) {
        return NextResponse.json({success: true, data: user});
    }

    // user exists; conflict!
    return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 409 });
});
