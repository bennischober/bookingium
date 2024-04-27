import { handler } from "@/handler";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface T {
    userid: string;
}

export const GET = handler<T>(async (req, token, context) => {
    // token could also be used?!
    const user = await User.findById(context?.params.userid).exec();
    
    if (!user) {
        return NextResponse.json(
            { success: false, error: `${User.modelName} not found` },
            { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
});
