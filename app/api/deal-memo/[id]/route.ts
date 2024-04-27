import { createDefaultDynamicHandler, handler } from "@/handler";
import { DealMemo } from "@/models/deal-memo";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface T {
    id: string;
}

export const GET = handler<T>(async (req, token, context) => {
    // get specific item
    // Note: if populate('foreignDoc') id does not exist, it returns null => no error is thrown!
    const dealMemo = await DealMemo.findOne({ _id: context?.params.id, userid: token })
        .populate('bandid')
        .populate('venueid')
        .populate('hotelid')
        .populate({
            path: 'lopro',
            populate: { path: 'person company' },
        }).exec();

    if (!dealMemo) {
        return NextResponse.json(
            { success: false, error: "DealMemo not found" },
            { status: 404 });
    }

    return NextResponse.json({ success: true, data: dealMemo });
});

// if we need specific PUT, DELETE logic, the defaults can be overridden/replaced
export const { PUT, DELETE } = createDefaultDynamicHandler(DealMemo);
