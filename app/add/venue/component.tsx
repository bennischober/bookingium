"use client";

import { VenueForm } from "@/components/Forms/VenueForm";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { IVenue } from "@/models/venue";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface VenueComponentProps {
    session: Session;
    persons: IPerson[];
    companies: ICompany[];
}

export default function VenueComponent({
    session,
    persons,
    companies,
}: VenueComponentProps) {
    const handleData = async (data: IVenue) => {
        await withNotification<IVenue>(
            () =>
                callAPI<IVenue>(
                    "/api/venue",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    return (
        <VenueForm
            session={session}
            handleData={handleData}
            persons={persons}
            companies={companies}
        />
    );
}
