import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DealMemoForm } from "../../../components/DealMemoForm";
import { AddDealMemoProps } from "../../../types";
import { getBands, getMemos, handleSession } from "../../../utils/appHandles";

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

    console.log("memos", memos, "bands", bands, "venues", venues, "lopros", lopros, "hotels", hotels);

    const router = useRouter();
    useEffect(() => {
        if (router && router.query) {
            handleSession(router, session, "/auth/login", {
                from: router.pathname,
            });
        }
    }, [router, session]);

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
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
    const pl =
        session && session.userid
            ? await axios.get("http://localhost:3000/api/band", {
                  params: {
                      userid: session.userid,
                  },
              })
            : null;
    const bands = pl ? await pl.data : null;

    const mm =
        session && session.userid
            ? await axios.get("http://localhost:3000/api/deal-memo", {
                  params: {
                      userid: session.userid,
                  },
              })
            : null;
    const memos = mm ? await mm.data : null;

    const vn =
        session && session.userid
            ? await axios.get("http://localhost:3000/api/venue", {
                  params: {
                      userid: session.userid,
                  },
              })
            : null;
    const venues = vn ? await vn.data : null;

    const lp =
        session && session.userid
            ? await axios.get("http://localhost:3000/api/lopro", {
                  params: {
                      userid: session.userid,
                  },
              })
            : null;

    const lopros = lp ? await lp.data : null;

    const ht =
        session && session.userid
            ? await axios.get("http://localhost:3000/api/hotel", {
                  params: {
                      userid: session.userid,
                  },
              })
            : null;

    const hotels = ht ? await ht.data : null;

    return {
        props: {
            session,
            bands: bands && bands.data ? bands.data : [],
            memos: memos && memos.data ? memos.data : [],
            venues: venues && venues.data ? venues.data : [],
            lopros: lopros && lopros.data ? lopros.data : [],
            hotels: hotels && hotels.data ? hotels.data : [],
        },
    };
};
