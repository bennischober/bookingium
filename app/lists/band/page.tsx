import { IBand } from "../../../models/band";
import { serverSideFetch } from "../../../utils/appHandles";
import { auth } from "@/auth";
import BandListComponent from "./component";

export default async function Page() {
    const session = await auth();
    if(!session) return null;

    const bands = await serverSideFetch<IBand[]>("/api/band", { userid: session.userid });

    return (
        <BandListComponent bands={bands} />
    );
}

