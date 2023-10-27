import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { IDealMemo } from "../../../models/deal-memo";
import { isPopulated, serverSideFetch } from "../../../utils/appHandles";
import { IBand } from "../../../models/band";
import { IVenue } from "../../../models/venue";
import { PDFContractPageProps } from "../../../types";
import PDFContract from "../../../components/PDF/PDFContract";
import { ViewerProps } from "../../../components/PDF/Viewer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ICompany } from "../../../models/company";
import { IPerson } from "../../../models/person";
import { IWorkplace } from "../../../models/workplace";
import { NumberInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { auth } from "../../../auth";

export default function ContractPage({
    session,
    band,
    bandCompany,
    bandResponsiblePerson,
    loproCompany,
    loproPerson,
    venue,
    dealMemo,
    workplace,
}: PDFContractPageProps) {
    const View = dynamic<ViewerProps>(
        () => import("../../../components/PDF/Viewer"),
        { ssr: false }
    );

    const [performance, setPerformance] = useState<string>("");
    const [showDuration, setShowDuration] = useState("");
    const [information, setInformation] = useState("");
    const [amountOfMembers, setAmountOfMembers] = useState(0);

    const pdfDoc = (
        <PDFContract
            bandName={band.name}
            bandCompany={bandCompany}
            bandResponsiblePerson={bandResponsiblePerson}
            loproCompany={loproCompany}
            loproPerson={loproPerson}
            venue={venue}
            dealMemo={dealMemo}
            workplace={workplace}
            performance={performance}
            duration={showDuration}
            information={information}
            amount={amountOfMembers}
        />
    );

    return (
        <>
            <TextInput
                label="Performance time"
                placeholder="ca. 21 Uhr"
                value={performance}
                onChange={(event) => setPerformance(event.currentTarget.value)}
            />
            <TextInput
                label="Show duration"
                placeholder="90 min"
                value={showDuration}
                onChange={(event) => setShowDuration(event.currentTarget.value)}
            />
            <TextInput
                label="Information"
                placeholder=" es spielen 2 suppports Ghoster und Stepfather Fred"
                value={information}
                onChange={(event) => setInformation(event.currentTarget.value)}
            />
            <NumberInput
                label="Amount of members"
                placeholder="6"
                value={amountOfMembers}
                onChange={(val) => setAmountOfMembers(Number(val))}
            />

            <View Pdf={pdfDoc} />
            <PDFDownloadLink document={pdfDoc} fileName="somename.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Download now!"
                }
            </PDFDownloadLink>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await auth(ctx);
    const id = ctx.query.id;

    const data = await serverSideFetch<IDealMemo>(`/api/deal-memo/${id}`, {
        userid: session?.userid,
    });

    const band = isPopulated<IBand>(data.bandid)
        ? (data.bandid as IBand)
        : null;
    const bandCompany = await serverSideFetch<ICompany>(
        `api/company/${band?.company}`,
        {
            userid: session?.userid,
        }
    );

    const bandResponsiblePerson = band?.members[0]
        ? await serverSideFetch<IPerson>(`api/person/${band?.members[0]}`, {
              userid: session?.userid,
          })
        : null;

    const loproCompany = isPopulated<ICompany>(data.lopro.company)
        ? (data.lopro.company as ICompany)
        : null;
    const loproPerson = isPopulated<ICompany>(data.lopro.person)
        ? (data.lopro.person as ICompany)
        : null;

    const venue = isPopulated<IVenue>(data.venueid)
        ? (data.venueid as IVenue)
        : null;

    const workplace = await serverSideFetch<IWorkplace>("/api/user/workplace", {
        userid: session?.userid,
    });

    return {
        props: {
            session: session,
            band: band,
            bandCompany: bandCompany,
            bandResponsiblePerson: bandResponsiblePerson,
            loproCompany: loproCompany,
            loproPerson: loproPerson,
            venue: venue,
            dealMemo: data,
            workplace: workplace,
        },
    };
};
