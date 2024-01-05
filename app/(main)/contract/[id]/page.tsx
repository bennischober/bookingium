import { authOrRedirect } from "@/auth";
import { IBand } from "@/models/band";
import { ICompany } from "@/models/company";
import { IDealMemo } from "@/models/deal-memo";
import { IPerson } from "@/models/person";
import { IVenue } from "@/models/venue";
import { IWorkplace } from "@/models/workplace";
import { getAppName } from "@/utils/appConfig";
import { isPopulated, serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import SpecificContractComponent from "./component";

export const metadata: Metadata = {
    title: "View contract | " + getAppName(),
};

export default async function Page({ params }: { params: { id: string } }) {
    const session = await authOrRedirect();

    const deal = await serverSideFetch<IDealMemo>(
        `/api/deal-memo/${params.id}`,
        {
            userid: session?.userid,
        }
    );

    const band = isPopulated<IBand>(deal.bandid)
        ? (deal.bandid as IBand)
        : ({} as IBand);

    const bandCompany = await serverSideFetch<ICompany>(
        `api/company/${band?.company}`,
        {
            userid: session?.userid,
        }
    );

    // current task:
    // port this to the /deal-memo/[id] to directly be able to download the contract there
    // add filter query to the API endpoint (optional)

    var bandResponsiblePerson = null;
    // instead of the foreach, add a filter to the query?
    band?.members.forEach(async (member) => {
        const person = await serverSideFetch<IPerson>(`api/person/${member}`, {
            userid: session?.userid,
        });
        if (person?.role.includes("TL")) {
            bandResponsiblePerson = person;
        }
    });
    if(!bandResponsiblePerson) {
        bandResponsiblePerson = await serverSideFetch<IPerson>(`api/person/${band?.members[0]}`, {
            userid: session?.userid,
        });
    }

    const loproCompany = isPopulated<ICompany>(deal.lopro.company)
        ? (deal.lopro.company as ICompany)
        : ({} as ICompany);
    const loproPerson = isPopulated<IPerson>(deal.lopro.person)
        ? (deal.lopro.person as IPerson)
        : ({} as IPerson);

    const venue = isPopulated<IVenue>(deal.venueid)
        ? (deal.venueid as IVenue)
        : ({} as IVenue);

    const workplace = await serverSideFetch<IWorkplace>("/api/user/workplace", {
        userid: session?.userid,
    });

    return (
        <SpecificContractComponent
            band={band}
            bandCompany={bandCompany}
            bandResponsiblePerson={bandResponsiblePerson}
            loproCompany={loproCompany}
            loproPerson={loproPerson}
            venue={venue}
            dealMemo={deal}
            workplace={workplace}
        />
    );
}
