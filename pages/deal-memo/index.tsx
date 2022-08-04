import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";
import { PageTemplate } from "../../components/Layout/PageTemplate";
import { DealMemoList } from "../../components/Lists/DealMemoList";
import { DealMemoProps } from "../../types";

export default function DealMemoPage({
    session,
    memos,
}: DealMemoProps) {
    // fetched data; is it neccessary to save it in the state?
    const [memosData, setMemosData] = useState(memos);

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
