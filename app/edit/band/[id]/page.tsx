import { authOrRedirect } from "@/auth";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import { IBand } from "@/models/band";
import SpecificBandComponent from "./component";
import { IDealMemo } from "@/models/deal-memo";

export const metadata: Metadata = {
    title: "Update Band data",
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await authOrRedirect();

    const band = await serverSideFetch<IBand>(`/api/band/${params.id}`, {
        userid: session.userid,
    });

    const persons = await serverSideFetch<IPerson[]>("/api/person", {
        userid: session.userid,
    });

    // band members
    let members: IPerson[] = [];
    // look for all persons, that are associated with the band
    for (const person of persons) {
        if (band.members.includes(person._id)) {
            members.push(person);
        }
    }

    // fetch the company, that is associated with the band
    const company = await serverSideFetch<ICompany>(
        `/api/company/${band.company}`,
        {
            userid: session.userid,
        }
    );
    // and put it into an array, so that the component can handle it
    const companies = [company];

    // only fetch the memos, that are associated with the band
    const memos = await serverSideFetch<IDealMemo[]>("/api/deal-memo", {
        userid: session.userid,
        bandid: band._id,
    });

    return (
        <SpecificBandComponent
            session={session}
            band={band}
            persons={persons}
            members={members}
            companies={companies}
            memos={memos}
        />
    );
}
