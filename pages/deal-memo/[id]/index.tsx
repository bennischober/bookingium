import { Button, Text } from "@mantine/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";
import { IDealMemo } from "../../../models/deal-memo";
import { goToLastRoute } from "../../../utils/appHandles";

// move interface to types file
// move jsx stuff to new component

export interface CompleteDealMemoPageProps {
    memo: IDealMemo;
}

export default function CompleteDealMemoPage({
    memo,
}: CompleteDealMemoPageProps) {
    const router = useRouter();

    return (
        <>
            <Button
                leftIcon={<MdArrowBack />}
                variant="subtle"
                onClick={() => goToLastRoute(router)}
            >
                <Text>Go back</Text>
            </Button>
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
