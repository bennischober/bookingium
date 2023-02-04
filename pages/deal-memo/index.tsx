import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { DealMemoForm } from "../../components/Forms/DealMemoForm";
import { PageTemplate } from "../../components/Layout/PageTemplate";
import { IDealMemo } from "../../models/deal-memo";
import { AddDealMemoProps } from "../../types";
import { getBands, getMemos, serverSideFetch } from "../../utils/appHandles";

export default function AddDealMemoPage({
    session,
    bands,
    memos,
    venues,
    hotels,
    persons,
    companies,
}: AddDealMemoProps) {
    // fetched data
    // do we really need a state here?
    const [bandsData, setBandsData] = useState(bands);
    const [memosData, setMemosData] = useState(memos);
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

        // // refetch memo data
        // const memos = await getMemos(session);
        // setMemosData(memos);
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
        <PageTemplate title={"Create a Deal Memo"}>
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
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });

    const bands = await serverSideFetch("/api/band", {
        userid: session?.userid,
    });
    const memos = await serverSideFetch("/api/deal-memo", {
        userid: session?.userid,
    });
    const venues = await serverSideFetch("/api/venue", {
        userid: session?.userid,
    });
    const hotels = await serverSideFetch("/api/hotel", {
        userid: session?.userid,
    });
    const persons = await serverSideFetch("/api/person", {
        userid: session?.userid,
    });
    const companies = await serverSideFetch("/api/company", {
        userid: session?.userid,
    });

    return {
        props: {
            session,
            bands: bands,
            memos: memos,
            venues: venues,
            hotels: hotels,
            persons: persons,
            companies: companies,
        },
    };
};
