import { auth } from "@/auth";
import { Metadata } from "next";
import DealMemoComponent from "./component";
import { IBand } from "@/models/band";
import { IVenue } from "@/models/venue";
import { IHotel } from "@/models/hotel";
import { IPerson } from "@/models/person";
import { ICompany } from "@/models/company";
import { FormContainer } from "@/components/Layout/FormContainer";
import { serverSideFetch } from "@/utils/appHandles";

export const metadata: Metadata = {
    title: "Create a new Deal Memo",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await auth();
    if (!session) return null;

    const bands = await serverSideFetch<IBand[]>("/api/band", {
        userid: session.userid,
    });

    const venues = await serverSideFetch<IVenue[]>("/api/venue", {
        userid: session?.userid,
    });

    const hotels = await serverSideFetch<IHotel[]>("/api/hotel", {
        userid: session?.userid,
    });

    const persons = await serverSideFetch<IPerson[]>("/api/person", {
        userid: session?.userid,
    });

    const companies = await serverSideFetch<ICompany[]>("/api/company", {
        userid: session?.userid,
    });

    return (
        <FormContainer>
            <DealMemoComponent
                session={session}
                bands={bands}
                venues={venues}
                hotels={hotels}
                persons={persons}
                companies={companies}
            />
        </FormContainer>
    );
}
