"use client";

import { BandForm } from "@/components/Forms/BandForm";
import { IBand } from "@/models/band";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface BandComponentProps {
    session: Session;
    persons: IPerson[];
    companies: ICompany[];
}

export default function BandComponent({
    session,
    persons,
    companies,
}: BandComponentProps) {
    const handleSave = async (data: IBand) => {
        await withNotification<IBand>(
            () =>
                callAPI(
                    "/band",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    return (
        <BandForm
            session={session}
            persons={persons}
            companies={companies}
            handleData={handleSave}
        />
    );
}
