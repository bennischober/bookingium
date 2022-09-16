import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { DealMemoList } from "../../../components/Lists/DealMemoList";
import { DealMemoProps } from "../../../types";
import { serverSideFetch } from "../../../utils/appHandles";

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

    const memos = await serverSideFetch("/api/deal-memo", { userid: session?.userid });

    return {
        props: {
            session,
            memos: memos,
        },
    };
};
