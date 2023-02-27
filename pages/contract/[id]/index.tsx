import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
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

export interface ContractPageProps {
    memo: IDealMemo;
    session: any;
}

export default function ContractPage({
    session,
    band,
    bandCompany,
    bandResponsiblePerson,
    loproCompany,
    loproPerson,
    venue,
    dealMemo,
}: PDFContractPageProps) {
    const View = dynamic<ViewerProps>(
        () => import("../../../components/PDF/Viewer"),
        { ssr: false }
    );

    const pdfDoc = (
        <PDFContract
            bandName={band.name}
            bandCompany={bandCompany}
            bandResponsiblePerson={bandResponsiblePerson}
            loproCompany={loproCompany}
            loproPerson={loproPerson}
            venue={venue}
            dealMemo={dealMemo}
        />
    );

    return (
        <>
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
    const session = await getSession({ req: ctx.req });
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
        },
    };
};
