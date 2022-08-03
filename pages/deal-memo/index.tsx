import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import axios from "axios";
import { PageTemplate } from "../../components/Layout/PageTemplate";
import { DealMemoList } from "../../components/Lists/DealMemoList";
import { handleSession } from "../../utils/appHandles";
import { DealMemoProps } from "../../types";

export default function DealMemoPage({
    session,
    memos,
}: DealMemoProps) {
    // fetched data
    const [memosData, setMemosData] = useState(memos);

    const router = useRouter();

    // could be moved to a separate hook!
    // check session and move to login, if session invalid
    // parameters: current path
    useEffect(() => {
        if (router && router.query) {
            handleSession(router, session, "/auth/login", {
                from: router.pathname,
            });
        }
    }, [router, session]);

    return (
        <PageTemplate title="Deal Memos">
            <DealMemoList memos={memosData} />
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
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
            memos: memos && memos.data ? memos.data : [],
        },
    };
};
