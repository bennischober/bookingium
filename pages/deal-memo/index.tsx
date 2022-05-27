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
import { Button, Center, Collapse, Space } from "@mantine/core";

// add popups, if hotel/venue does not exits
// also add auto complete for band, venue, lopro, hotel

export default function DealMemoPage({ session, bands, memos }: DealMemoProps) {
    // fetched data
    const [bandsData, setBandsData] = useState(bands);
    const [memosData, setMemosData] = useState(memos);

    // other state
    const [addMemoOpened, setAddMemoOpened] = useState(false);

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
            <Center>
                <Button onClick={() => setAddMemoOpened((o) => !o)}>
                    Add new Deal Memo
                </Button>
            </Center>
            <Space h="xl" />
            <Collapse in={addMemoOpened}>
                <DealMemoForm
                    session={session}
                    bands={bandsData}
                    fetchBands={fetchBands}
                    fetchMemos={fetchMemos}
                />
                <Space h="xl" />
            </Collapse>
            <DealMemoList memos={memosData} />
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // this throws an error, because the http headers will be sent by getSession and axios.get
    // https://stackoverflow.com/a/65546189

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
