import { auth } from "@/auth";
import { IBand } from "@/models/band";
import { IDealMemo } from "@/models/deal-memo";
import { IHotel } from "@/models/hotel";
import { IVenue } from "@/models/venue";
import { isPopulated, serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import SpecificDealMemoComponent from "./component";

export const metadata: Metadata = {
    title: "Create a new Deal Memo",
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) return null;

    const memo = await serverSideFetch<IDealMemo>(
        `/api/deal-memo/${params.id}`,
        {
            userid: session.userid,
        }
    );

    const band = isPopulated<IBand>(memo.bandid)
        ? (memo.bandid as IBand)
        : undefined;
    const venue = isPopulated<IVenue>(memo.venueid)
        ? (memo.venueid as IVenue)
        : undefined;
    const hotel = isPopulated<IHotel>(memo.hotelid)
        ? (memo.hotelid as IHotel)
        : undefined;

    // fetch hotels, if not already selected
    const hotels =
        hotel == undefined || null
            ? await serverSideFetch<IHotel[]>("/api/hotel", {
                  userid: session.userid,
              })
            : [];

    // check if all are not undefined
    if (!band || !venue) {
        console.error("Band or Venue is undefined");
        return null;
    }

    return (
        <>
            <SpecificDealMemoComponent
                session={session}
                id={params.id}
                memo={memo}
                band={band}
                venue={venue}
                hotel={hotel}
                hotels={hotels}
            />
        </>
    );
}
