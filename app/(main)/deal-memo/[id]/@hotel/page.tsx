import { auth } from "@/auth";
import { IDealMemo } from "@/models/deal-memo";
import { IHotel } from "@/models/hotel";
import { isPopulated, serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import { HotelComponent } from "./component";

export const metadata: Metadata = {
    title: "Update Hotel - Deal Memo",
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

    const hotel = isPopulated<IHotel>(memo.hotelid)
        ? (memo.hotelid as IHotel)
        : undefined;

    // only if hotel is not populated, fetch hotels
    const hotels =
        hotel == undefined || null
            ? await serverSideFetch<IHotel[]>("/api/hotel", {
                  userid: session.userid,
              })
            : [];

    return (
        <HotelComponent
            session={session}
            memoId={memo._id}
            hotels={hotel ?? hotels}
        />
    );
}
