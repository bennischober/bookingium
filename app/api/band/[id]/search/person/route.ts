import { handler } from "@/handler";
import { Band } from "@/models/band";
import { IPerson } from "@/models/person";
import { isPopulated } from "@/utils/appHandles";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface T {
    id: string;
}

export const GET = handler<T>(async (req, token, context) => {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());
    // maybe move stuff like this to a global constant as some kind of API behavior
    const fallbackToFirst = req.nextUrl.searchParams.get('useFallback') === 'true';

    // search for the band and filter the members
    const band = await Band.findOne({ _id: context?.params.id })
        .populate({
            path: 'members',
            match: query
        })
        .exec();

    // no band found
    if (!band) {
        return NextResponse.json({ success: false, error: 'Band not found' }, { status: 404 });
    }

    let members = isPopulated<IPerson[]>(band.members) ? band.members as IPerson[] : [];

    // we did not find that specific band member, but we want a fallback
    if (members.length === 0 && fallbackToFirst) {
        const fallbackBand = await Band.findOne({ _id: context?.params.id })
            .populate('members')
            .exec();

        if (fallbackBand && isPopulated<IPerson[]>(fallbackBand.members) && fallbackBand.members.length > 0) {
            members = [fallbackBand.members[0] as IPerson];
        }
    }

    return NextResponse.json({ success: true, data: members });
});
