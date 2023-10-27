"use client";
import { DealMemoForm } from "../../components/Forms/DealMemoForm";
import { IDealMemo } from "../../models/deal-memo";
import { AddDealMemoProps } from "../../types";
import { callAPI, withNotification } from "@/utils/apiHandler";

export default function DealMemoComponent({
    session,
    bands,
    venues,
    hotels,
    persons,
    companies,
}: AddDealMemoProps) {
    const handleMemos = async (data: IDealMemo) => {
        // post band data
        await withNotification(
            () =>
                callAPI(
                    "/api/deal-memo",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    const handleBands = async (data: {}) => {
        await withNotification(
            () =>
                callAPI(
                    "/api/band",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    const handleVenues = async (data: {}) => {
        await withNotification(
            () =>
                callAPI(
                    "/api/venue",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    const handleHotels = async (data: {}) => {
        await withNotification(
            () =>
                callAPI(
                    "/api/hotel",
                    "POST",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    return (
        <DealMemoForm
            session={session}
            bands={bands}
            venues={venues}
            hotels={hotels}
            persons={persons}
            companies={companies}
            handleBands={handleBands}
            handleMemos={handleMemos}
            handleVenues={handleVenues}
            handleHotels={handleHotels}
        />
    );
}
