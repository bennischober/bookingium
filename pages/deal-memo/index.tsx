import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import DealMemoForm from "../../components/DealMemoForm";
import { PageTemplate } from "../../components/PageTemplate";
import { DealMemoProps } from "../../types";

// Rework component and move interfaces
// also import {v4 as uuid4} from 'uuid'; to generate a unique id for deal memo

// add popups, if hotel/band/venue does not exits
// also add auto complete for band, venue, lopro, hotel

// split component stuff to own file; only leave session and payload validation in here
// also add new get request, if new band is added

export default function DealMemoPage({ session, bands }: DealMemoProps) {
    return (
        <PageTemplate title="Deal Memos">
            <DealMemoForm session={session} bands={bands} />
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

    const payload = pl && (await pl.data) ? await pl.data : null;

    return {
        props: {
            session,
            payload: payload?.data,
        },
    };
};
