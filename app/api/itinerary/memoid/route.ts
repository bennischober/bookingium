import { handler } from "@/handler";
import { Itinerary } from "@/models/itinerary";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface T {
    memoid: string;
}

export const GET = handler<T>(async (req, token, context) => {
    const doc = await Itinerary.findOne({ userid: token, dealMemoId: context?.params.memoid }).exec();

    if (!doc) {
        return NextResponse.json(
            { success: false, error: `${Itinerary.modelName} not found` },
            { status: 404 });
    }
    return NextResponse.json({ success: true, data: doc });
});
