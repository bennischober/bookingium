import { handler } from "@/handler";
import { Band } from "@/models/band";
import { validateBody } from "@/utils/appHandles";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface T {
    id: string;
}

export const GET = handler<T>(async (req, token, context) => {
    const band = await Band.findOne({ _id: context?.params.id, userid: token }).exec();

    if (!band) {
        return NextResponse.json({ success: false, error: 'Band not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: band });
});

export const PUT = handler<T>(async (req, token, context) => {
    const body = await validateBody(req);

    const band = await Band.updateOne({ _id: context?.params.id, userid: token }, { $set: body.data }, { runValidators: true, });
    if (!band || band.modifiedCount === 0) {
        return NextResponse.json({ success: false, error: 'Band not found, unable to update' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: band });
});

export const DELETE = handler<T>(async (req, token, context) => {
    const band = await Band.deleteOne({ _id: context?.params.id, userid: token });

    if (!band || band.deletedCount === 0) {
        return NextResponse.json({ success: false, error: 'Band not found, unable to delete' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: band });
});
