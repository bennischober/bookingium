"use client";

import { PdfDownloadButton } from "@/components/Core/Buttons/PdfDownloadButton";
import { SpecificPageHeader } from "@/components/Layout/SpecificPageHeader";
import PDFContract from "@/components/PDF/PDFContract";
import { IBand } from "@/models/band";
import { ICompany } from "@/models/company";
import { IDealMemo } from "@/models/deal-memo";
import { IPerson } from "@/models/person";
import { IVenue } from "@/models/venue";
import { IWorkplace } from "@/models/workplace";
import { Button } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { MdOutlineNoteAdd } from "react-icons/md";

interface HeadComponentProps {
    id: string;
    filename: string;
    memo: IDealMemo;
    band: IBand;
    bandCompany: ICompany;
    bandResponsiblePerson: IPerson;
    loproCompany: ICompany;
    loproPerson: IPerson;
    venue: IVenue;
    workplace: IWorkplace;
}

export function HeadComponent({
    id,
    filename,
    memo,
    band,
    bandCompany,
    bandResponsiblePerson,
    loproCompany,
    loproPerson,
    venue,
    workplace,
}: HeadComponentProps) {
    return (
        <SpecificPageHeader
            title={<Link href={`/edit/band/${band._id}`}>{band.name}</Link>}
            titleName={"Band"}
            subTitle={`Date: ${dayjs(memo.date).format(
                "DD.MM.YYYY"
            )} | Venue: ${venue.name}`}
            other={
                // move this to seperate component!
                <Button.Group>
                    <Link href={`/itinerary/${id}`}>
                        <Button
                            variant="default"
                            leftSection={<MdOutlineNoteAdd size={20} />}
                        >
                            Create an Itinerary
                        </Button>
                    </Link>
                    <PdfDownloadButton
                        title={"Download Contract"}
                        fileName={filename}
                        pdfDocument={
                            <PDFContract
                                bandName={band.name}
                                bandCompany={bandCompany}
                                bandResponsiblePerson={bandResponsiblePerson}
                                loproCompany={loproCompany}
                                loproPerson={loproPerson}
                                venue={venue}
                                dealMemo={memo}
                                workplace={workplace}
                            />
                        }
                    />
                </Button.Group>
            }
        />
    );
}
