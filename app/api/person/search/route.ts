import { handler } from "@/handler";
import { Person } from "@/models/person";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = handler(async (req, token, context) => {
    const allParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const person = await Person.find(allParams).exec();

    if (!person) {
        return NextResponse.json(
            { success: false, error: `${Person.modelName} not found` },
            { status: 404 });
    }
    return NextResponse.json({ success: true, data: person });
});
