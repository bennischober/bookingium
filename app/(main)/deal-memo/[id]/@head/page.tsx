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
import { Session } from "next-auth";

async function fetchData(id: string, session: Session) {
    const params = { userid: session.userid };
    // parallel fetch data
    const memoData = serverSideFetch<IDealMemo>(`/api/deal-memo/${id}`, params);
    const wpData = serverSideFetch<IWorkplace>("/api/user/workplace", params);
    const [memo, workplace] = await Promise.all([memoData, wpData]);

    // ensure data population
    const band = isPopulated<IBand>(memo.bandid)
        ? (memo.bandid as IBand)
        : ({} as IBand);
    const loproCompany = isPopulated<ICompany>(memo.lopro.company)
        ? (memo.lopro.company as ICompany)
        : ({} as ICompany);
    const loproPerson = isPopulated<IPerson>(memo.lopro.person)
        ? (memo.lopro.person as IPerson)
        : ({} as IPerson);
    const venue = isPopulated<IVenue>(memo.venueid)
        ? (memo.venueid as IVenue)
        : ({} as IVenue);

    // parallel fetch data
    const bandCompanyData = serverSideFetch<ICompany>(
        `api/company/${band?.company}`,
        params
    );
    const bandResponsiblePersonData = serverSideFetch<IPerson>(
        `api/band/${band?._id}/search/person`,
        {
            userid: session?.userid,
            role: "TL",
        }
    );
    const [bandCompany, bandResponsiblePerson] = await Promise.all([
        bandCompanyData,
        bandResponsiblePersonData,
    ]);

    return {
        memo,
        band,
        bandCompany,
        bandResponsiblePerson,
        loproCompany,
        loproPerson,
        venue,
        workplace,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) return null;

    const {
        memo,
        band,
        bandCompany,
        bandResponsiblePerson,
        loproCompany,
        loproPerson,
        venue,
        workplace,
    } = await fetchData(params.id, session);

    // ensure, that band?.name has no whitespaces, is lowercase and has no special characters
    var bandName = band?.name
        .split("")
        .map((char) => char.toLowerCase())
        .filter(
            (char) =>
                (char >= "a" && char <= "z") ||
                (char >= "0" && char <= "9") ||
                char === " "
        )
        .filter((char) => char !== " ")
        .join("");
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
