"use client";

import { HotelForm } from "@/components/Forms/HotelForm";
import { IHotel } from "@/models/hotel";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface HotelComponentProps {
    session: Session;
}

export default function HotelComponent({ session }: HotelComponentProps) {
    const handleData = async (data: IHotel) => {
        await withNotification(
            () =>
                callAPI(
                    "/hotel",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    return <HotelForm session={session} handleData={handleData} />;
}
