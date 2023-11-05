"use client";

import { PersonForm } from "@/components/Forms/PersonForm";
import { IPerson } from "@/models/person";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface PersonComponentProps {
    session: Session;
}

export default function PersonComponent({ session }: PersonComponentProps) {
    const handleData = async (data: IPerson) => {
        await withNotification<IPerson>(
            () =>
                callAPI<IPerson>(
                    "/api/person",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    return <PersonForm session={session} handleData={handleData} />;
}
