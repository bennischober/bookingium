import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import axios from "axios";
import DealMemoForm from "../../components/DealMemoForm";
import { PageTemplate } from "../../components/PageTemplate";
import { DealMemoList } from "../../components/DealMemoList";
import { handleSession } from "../../utils/appHandles";
import { DealMemoProps } from "../../types";

// add popups, if hotel/band/venue does not exits
// also add auto complete for band, venue, lopro, hotel

// also add new get request, if new band is added

export default function DealMemoPage({ session, bands, memos }: DealMemoProps) {
    const [bandsData, setBandsData] = useState(bands);
    const [memosData, setMemosData] = useState(memos);

    const router = useRouter();
    useEffect(() => {
        if (router && router.query) {
            handleSession(router, session, "/", { from: router.pathname });
        }
    }, [router, session]);

    const fetchBands = async () => {
        const res = await axios.get("/api/band");
        if (res.status !== 200) return;
        setBandsData(res.data);
    };

    const fetchMemos = async () => {
        const res = await axios.get("/api/deal-memo");
        if (res.status !== 200) return;
        setMemosData(res.data);
    };

    return (
        <PageTemplate title="Deal Memos">
            <DealMemoForm
                session={session}
                bands={bandsData}
                fetchBands={fetchBands}
                fetchMemos={fetchMemos}
            />
            <DealMemoList memos={memosData} />
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // this throws an error, because the http headers will be sent by getSession and axios.get

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

    return {
        props: {
            session,
            bands: bands?.data,
            memos: memos?.data,
        },
    };
};
