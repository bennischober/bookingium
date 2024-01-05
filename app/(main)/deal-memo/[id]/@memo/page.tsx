import { auth } from "@/auth";
import { IDealMemo } from "@/models/deal-memo";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import MemoComponent from "./component";

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

    return (
        <MemoComponent session={session} memo={memo} />
    );
}
