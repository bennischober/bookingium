import { authOrRedirect } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { IHotel } from "@/models/hotel";
import { IVenue } from "@/models/venue";
import { getAppName } from "@/utils/appConfig";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import ItineraryComponent from "./component";
import { SpecificPageHeader } from "@/components/Layout/SpecificPageHeader";
import { ContentContainer } from "@/components/Layout/ContentContainer";

export const metadata: Metadata = {
    title: "Create a new Itinerary | " + getAppName(),
};

export default async function Page({ params }: { params: { memoid: string } }) {
    const session = await authOrRedirect();

    const venues = await serverSideFetch<IVenue[]>("/api/venue/", {
        userid: session.userid,
    });

    const hotels = await serverSideFetch<IHotel[]>("/api/hotel/", {
        userid: session.userid,
    });

    return (
        <>
            <SpecificPageHeader
                title={params.memoid}
                titleName="Create a new Itinerary"
            />
            <ContentContainer>
                <FormContainer>
                    <ItineraryComponent
                        session={session}
                        dealId={params.memoid}
                        venues={venues}
                        hotels={hotels}
                    />
                </FormContainer>
            </ContentContainer>
        </>
    );
}
