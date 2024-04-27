import { createDefaultHandler, handler } from "@/handler";
import { DealMemo } from "@/models/deal-memo";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = handler(async (req, token, context) => {
    const query = req.nextUrl.searchParams.get('bandid');

    if (query) {
        const dealMemo = await DealMemo.find({ userid: token, bandid: query })
            .populate('bandid')
            .exec();

        return NextResponse.json({ success: true, data: dealMemo });
    }

    const dealMemo = await DealMemo.find({ userid: token }).populate('bandid').exec();
    return NextResponse.json({ success: true, data: dealMemo });
});

export const { POST } = createDefaultHandler(DealMemo);
