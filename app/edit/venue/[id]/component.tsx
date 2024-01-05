"use client";

import { VenueForm } from "@/components/Forms/VenueForm";
import { ICompany } from "@/models/company";
import { IPerson } from "@/models/person";
import { IVenue } from "@/models/venue";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface SpecificVenueComponentProps {
    session: Session;
    venue: IVenue;
    companies: ICompany[];
    persons: IPerson[];
}

export default function SpecificVenueComponent({
    session,
    venue,
    companies,
    persons,
}: SpecificVenueComponentProps) {
    const handleData = async (data: IVenue) => {
        await withNotification<IVenue>(
            () =>
                callAPI(
                    `/venue/${venue._id}`,
                    "PUT",
                    { data: data },
                    { userid: session.userid }
                ),
            {
                notificationId: "update-venue",
                loadingTitle: "Updating Venue",
                loadingMessage: "Please wait...",
                successTitle: "Venue updated successfully!",
                successMessage: "You can now close this window.",
                errorTitle: "Venue update failed!",
                errorMessage: "Please try again later.",
            },
            "PUT"
        );
    };

    return (
        <VenueForm
            session={session}
            handleData={handleData}
            data={venue}
            companies={companies}
            persons={persons}
            isEdit
        />
    );
}
