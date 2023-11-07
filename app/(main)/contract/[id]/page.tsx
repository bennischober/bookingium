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
import { IItinerary } from "@/models/itinerary";

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

    const it = await serverSideFetch<IItinerary>("/api/itinerary/", {
        userid: session?.userid,
        memoid: params.id,
    });

    const band = isPopulated<IBand>(deal.bandid)
        ? (deal.bandid as IBand)
        : ({} as IBand);

    const bandCompany = await serverSideFetch<ICompany>(
        `api/company/${band?.company}`,
        {
            userid: session?.userid,
        }
    );

    // this needs to be fixed! the responsible person as TL as role!
    // if this role is not provided, use the first member of the band
    const bandResponsiblePerson = band?.members[0]
        ? await serverSideFetch<IPerson>(`api/person/${band?.members[0]}`, {
              userid: session?.userid,
          })
        : ({} as IPerson);

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
            itinerary={it}
        />
    );
}
