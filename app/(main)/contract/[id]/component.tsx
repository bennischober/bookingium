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
import { IItinerary } from "@/models/itinerary";
import { usePdfStateContext } from "../../provider";
import { notifications } from "@mantine/notifications";
import { MdClose } from "react-icons/md";
import { Button, Center } from "@mantine/core";
import { useRouter } from "next/navigation";

// TODO: rework this; itinerary could also be included here!
interface SpecificContractComponentProps {
    band: IBand;
    bandCompany: ICompany;
    bandResponsiblePerson?: IPerson;
    loproCompany: ICompany;
    loproPerson: IPerson;
    venue: IVenue;
    dealMemo: IDealMemo;
    workplace: IWorkplace;
    itinerary: IItinerary;
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
    itinerary,
}: SpecificContractComponentProps) {
    const pdf = usePdfStateContext();
    const router = useRouter();

    const View = dynamic<ViewerProps>(() => import("@/components/PDF/Viewer"), {
        ssr: false,
    });

    // if itinerary is null, display error notification
    if (!itinerary) {
        notifications.show({
            id: "itinerary-is-null",
            color: "red",
            title: "Error: Itinerary is missing!",
            message:
                "Itinerary is not available! Please create first, before creating a contract!",
            icon: <MdClose />,
            loading: false,
            autoClose: 5000,
        });
        return (
            <>
                <Center>
                    <Button variant="default" onClick={() => router.back()}>
                        Go back
                    </Button>
                </Center>
            </>
        );
    }

    // check if anything is null or missing and display error notification
    if (
        !band ||
        !bandCompany ||
        !bandResponsiblePerson ||
        !loproCompany ||
        !loproPerson ||
        !venue ||
        !dealMemo ||
        !workplace ||
        !itinerary
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
            performance={itinerary.showTimeMainAct}
            duration={itinerary.showLength}
            information={pdf.state.information}
            amount={pdf.state.amountOfMembers}
        />
    );

    return <View Pdf={pdfDoc} />;
}
