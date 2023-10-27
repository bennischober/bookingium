import { serverSideFetch } from "../../../utils/appHandles";
import { auth } from "@/auth";
import { IDealMemo } from "@/models/deal-memo";
import DealMemoListComponent from "./component";

export default async function Page() {
    const session = await auth();
    if (!session) return null;

    const memos = await serverSideFetch<IDealMemo[]>("/api/deal-memo", {
        userid: session.userid,
    });

    return <DealMemoListComponent memos={memos} />;
}
