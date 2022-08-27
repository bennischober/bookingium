import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { DealMemoForm } from "../../../components/Forms/DealMemoForm";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { AddDealMemoProps } from "../../../types";
import { getBands, getMemos, serverSideFetch } from "../../../utils/appHandles";

export default function AddDealMemoPage({
    session,
    bands,
    memos,
    venues,
    lopros,
    hotels,
}: AddDealMemoProps) {
    // fetched data
    const [bandsData, setBandsData] = useState(bands);
    const [memosData, setMemosData] = useState(memos);
    const [venueData, setVenueData] = useState(venues);
    const [loproData, setLoproData] = useState(lopros);
    const [hotelData, setHotelData] = useState(hotels);

    const handleMemos = async (data: {}) => {
        // post memo data
        await axios.post("/api/deal-memo", { data: data });

        // refetch memo data
        const memos = await getMemos(session);
        setMemosData(memos);
    };

    const handleBands = async (data: {}) => {
        // post band data
        await axios.post("/api/band", { data: data });

        // refetch band data
        const bands = await getBands(session);
        setBandsData(bands);
    };

    // add other forms => add api calls on ssr => add data to state => add data to autocomplete in forms => populate data on specific memo => add edit components for specific memo
    // => think about a good way to handle the hotel data (if it is not choosen in the form => how to do it in edit form on specific memo)
    const handleVenues = async (data: {}) => {
        console.log(data);
        await axios.post("/api/venue", { data: data });
    };

    const handleLopros = async (data: {}) => {
        console.log(data);
        await axios.post("/api/lopro", { data: data });
    };

    const handleHotels = async (data: {}) => {
        console.log(data);
        await axios.post("/api/hotel", { data: data });
    };

    return (
        <PageTemplate title={"Create a Deal Memo"}>
            <DealMemoForm
                session={session}
                bands={bandsData}
                venues={venueData}
                lopros={loproData}
                hotels={hotelData}
                handleBands={handleBands}
                handleMemos={handleMemos}
                handleVenues={handleVenues}
                handleLopros={handleLopros}
                handleHotels={handleHotels}
            />
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });

    const bands = await serverSideFetch("/api/band", {userid: session?.userid});
    const memos = await serverSideFetch("/api/deal-memo", {userid: session?.userid});
    const venues = await serverSideFetch("/api/venue", {userid: session?.userid});
    const lopros = await serverSideFetch("/api/lopro", {userid: session?.userid});
    const hotels = await serverSideFetch("/api/hotel", {userid: session?.userid});

    return {
        props: {
            session,
            bands: bands,
            memos: memos,
            venues: venues,
            lopros: lopros,
            hotels: hotels,
        },
    };
};
