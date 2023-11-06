"use client";

import { CompanyForm } from "@/components/Forms/CompanyForm";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface SpecificCompanyComponentProps {
    session: Session;
    company: ICompany;
    persons: IPerson[];
}

export default function SpecificCompanyComponent({
    session,
    company,
    persons,
}: SpecificCompanyComponentProps) {
    const handleData = async (data: ICompany) => {
        await withNotification<ICompany>(
            () =>
                callAPI(
                    `/company/${data._id}`,
                    "PUT",
                    { data: data },
                    { userid: session.userid }
                ),
            {
                notificationId: "update-company",
                loadingTitle: "Updating Company",
                loadingMessage: "Please wait...",
                successTitle: "Company updated successfully!",
                successMessage: "You can now close this window.",
                errorTitle: "Company update failed!",
                errorMessage: "Please try again later.",
            },
            "PUT"
        );
    };

    return (
        <CompanyForm
            session={session}
            handleData={handleData}
            data={company}
            persons={persons}
        />
    );
}
