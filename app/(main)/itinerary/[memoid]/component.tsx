"use client";

import { IHotel } from "@/models/hotel";
import { IItinerary, Itinerary } from "@/models/itinerary";
import { IVenue } from "@/models/venue";
import { getFormValueObject } from "@/utils/appHandles";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";
import { ItineraryForm } from "@/components/Forms/ItineraryForm";

interface ItineraryComponentProps {
    session: Session;
    dealId: string;
    venues: IVenue[];
    hotels: IHotel[];
}

export default function ItineraryComponent({
    session,
    dealId,
    venues,
    hotels,
}: ItineraryComponentProps) {
    const handleItinerary = async (data: Itinerary) => {
        const itinerary = getFormValueObject<Itinerary>(
            data,
            session.userid
        ) as IItinerary;

        await withNotification(
            () =>
                callAPI<IItinerary>(
                    "/itinerary/",
                    "POST",
                    { data: itinerary },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    return (
        <ItineraryForm
            dealId={dealId}
            handleItinerary={handleItinerary}
            venues={venues}
            hotels={hotels}
        />
    );
}
