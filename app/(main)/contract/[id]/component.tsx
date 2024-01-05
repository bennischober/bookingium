"use client";

import dynamic from "next/dynamic";
import { ViewerProps } from "@/components/PDF/Viewer";
import PDFContract from "@/components/PDF/PDFContract";
import { IBand } from "@/models/band";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { IVenue } from "@/models/venue";
import { IDealMemo } from "@/models/deal-memo";
import { IWorkplace } from "@/models/workplace";

interface SpecificContractComponentProps {
    band: IBand;
    bandCompany: ICompany;
    bandResponsiblePerson?: IPerson;
    loproCompany: ICompany;
    loproPerson: IPerson;
    venue: IVenue;
    dealMemo: IDealMemo;
    workplace: IWorkplace;
}

// for downloading the pdf, see: https://github.com/diegomura/react-pdf/issues/975
// and https://github.com/diegomura/react-pdf/issues/736#issuecomment-656029008

export default function SpecificContractComponent({
    band,
    bandCompany,
    bandResponsiblePerson,
    loproCompany,
    loproPerson,
    venue,
    dealMemo,
    workplace,
}: SpecificContractComponentProps) {
    const View = dynamic<ViewerProps>(() => import("@/components/PDF/Viewer"), {
        ssr: false,
    });

    // check if anything is null or missing and display error notification
    if (
        !band ||
        !bandCompany ||
        !bandResponsiblePerson ||
        !loproCompany ||
        !loproPerson ||
        !venue ||
        !dealMemo ||
        !workplace
    ) {
        console.error("Something is missing!");
        return <div>Something is missing!</div>;
    }

    // this could also be passed as props, so that the user can view it
    // or download it directly in the deal memo page?
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
        />
    );

    return <View Pdf={pdfDoc} />;
}
