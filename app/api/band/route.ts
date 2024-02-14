import { handler } from "@/handler";
import { Band } from "@/models/band";
import { validateBody } from "@/utils/appHandles";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const POST = handler(async (req, token) => {
    const body = await validateBody(req);

    const band = await Band.create(body.data);
    return NextResponse.json({ success: true, data: band }, { status: 200 });
});

export const GET = handler(async (req, token) => {
    const data = await Band.find({ 'userid': token }).exec();
    return NextResponse.json({ success: true, data: data }, { status: 200 });
});
