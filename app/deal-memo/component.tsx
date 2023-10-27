"use client";
import axios from "axios";
import { useState } from "react";
import { DealMemoForm } from "../../components/Forms/DealMemoForm";
import { IDealMemo } from "../../models/deal-memo";
import { AddDealMemoProps } from "../../types";
import { getBands } from "../../utils/appHandles";

export default function DealMemoComponent({
    session,
    bands,
    venues,
    hotels,
    persons,
    companies,
}: AddDealMemoProps) {
    // fetched data
    // do we really need a state here?
    const [bandsData, setBandsData] = useState(bands);
    const [venueData, setVenueData] = useState(venues);
    const [hotelData, setHotelData] = useState(hotels);

    const handleMemos = async (data: IDealMemo) => {
        // post band data
        console.log(data);
        const ret = await axios.post(
            "/api/deal-memo",
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);
    };

    const handleBands = async (data: {}) => {
        // post band data
        await axios.post("/api/band", { data: data });

        // refetch band data
        const bands = await getBands(session);
        setBandsData(bands);
    };

    const handleVenues = async (data: {}) => {
        console.log(data);
        await axios.post("/api/venue", { data: data });
    };

    const handleHotels = async (data: {}) => {
        console.log(data);
        await axios.post("/api/hotel", { data: data });
    };

    return (
        <DealMemoForm
            session={session}
            bands={bandsData}
            venues={venueData}
            hotels={hotelData}
            persons={persons}
            companies={companies}
            handleBands={handleBands}
            handleMemos={handleMemos}
            handleVenues={handleVenues}
            handleHotels={handleHotels}
        />
    );
}
