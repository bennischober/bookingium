import { PersonForm } from "@/components/Forms/PersonForm";
import { IPerson } from "@/models/person";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface SpecificPersonComponentProps {
    session: Session;
    person: IPerson;
}

export default function SpecificPersonComponent({
    session,
    person,
}: SpecificPersonComponentProps) {
    const handleData = async (data: IPerson) => {
        await withNotification<IPerson>(
            () =>
                callAPI(
                    `/person/${data._id}`,
                    "PUT",
                    { data: data },
                    { userid: session.userid }
                ),
            {
                notificationId: "update-person",
                loadingTitle: "Updating Person",
                loadingMessage: "Please wait...",
                successTitle: "Person updated successfully!",
                successMessage: "You can now close this window.",
                errorTitle: "Person update failed!",
                errorMessage: "Please try again later.",
            },
            "PUT"
        );
    };

    return (
        <PersonForm session={session} handleData={handleData} data={person} />
    );
}
