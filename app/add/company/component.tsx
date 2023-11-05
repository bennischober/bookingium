"use client";

import { CompanyForm } from "@/components/Forms/CompanyForm";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface CompanyComponentProps {
    session: Session;
    persons: IPerson[];
}

export default function CompanyComponent({
    session,
    persons,
}: CompanyComponentProps) {
    const handleData = async (data: ICompany) => {
        await withNotification<ICompany>(
            () =>
                callAPI(
                    "/company",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    return (
        <CompanyForm
            session={session}
            handleData={handleData}
            persons={persons}
        />
    );
}
