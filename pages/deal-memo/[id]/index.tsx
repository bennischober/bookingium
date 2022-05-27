import axios from "axios";
import { GetServerSideProps } from "next";
import { IDealMemo } from "../../../models/deal-memo";

export interface CompleteDealMemoPageProps {
    memo: IDealMemo;
}

// Add "Back to Memos" button on top
// set router query parameter to pathBefore to get back to memos page without calling router.push("/deal-memo")

export default function CompleteDealMemoPage({
    memo,
}: CompleteDealMemoPageProps) {
    return (
        <>
            <h1>Complete Deal Memos</h1>
            {memo.dealId}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx.query.id;
    const res = await axios.get(`http://localhost:3000/api/deal-memo/${id}`);
    const data = await res.data;
    return { props: { memo: data.data } };
};
