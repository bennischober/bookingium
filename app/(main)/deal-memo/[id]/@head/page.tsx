import { auth } from "@/auth";
import { IBand } from "@/models/band";
import { IDealMemo } from "@/models/deal-memo";
import { IVenue } from "@/models/venue";
import { isPopulated, serverSideFetch } from "@/utils/appHandles";
import dayjs from "dayjs";
import { HeadComponent } from "./component";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { IWorkplace } from "@/models/workplace";

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
        : ({} as IBand);

    const bandCompany = await serverSideFetch<ICompany>(
        `api/company/${band?.company}`,
        {
            userid: session?.userid,
        }
    );

    const bandResponsiblePerson = await serverSideFetch<IPerson>(
        `api/band/${band?._id}/search/person`,
        {
            userid: session?.userid,
            role: "TL",
        }
    );

    const loproCompany = isPopulated<ICompany>(memo.lopro.company)
        ? (memo.lopro.company as ICompany)
        : ({} as ICompany);
    const loproPerson = isPopulated<IPerson>(memo.lopro.person)
        ? (memo.lopro.person as IPerson)
        : ({} as IPerson);

    const venue = isPopulated<IVenue>(memo.venueid)
        ? (memo.venueid as IVenue)
        : ({} as IVenue);

    const workplace = await serverSideFetch<IWorkplace>("/api/user/workplace", {
        userid: session?.userid,
    });

    // ensure, that band?.name has no whitespaces, is lowercase and has no special characters
    var bandName = band?.name
        .replace(/\s/g, "")
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, "")
        .replace(/\s/g, "");
    const date = dayjs(memo.date).format("DDMMYY");
    const filename = bandName + "_contract_" + date;

    return (
        <HeadComponent
            id={params.id}
            filename={filename}
            memo={memo}
            band={band}
            bandCompany={bandCompany}
            bandResponsiblePerson={bandResponsiblePerson}
            loproCompany={loproCompany}
            loproPerson={loproPerson}
            venue={venue}
            workplace={workplace}
        />
    );
}
