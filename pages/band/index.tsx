import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PageTemplate } from "../../components/Layout/PageTemplate";
import { BandList } from "../../components/Lists/BandList";
import { IBand } from "../../models/band";


export interface BandPageProps {
    bands: IBand[];
}

export default function BandPage({
    bands
}: BandPageProps) {
    return (
        <PageTemplate title="Deal Memos">
            <BandList bands={bands} />
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
    const bandFetch =
        session && session.userid
            ? await axios.get("http://localhost:3000/api/band", {
                  params: {
                      userid: session.userid,
                  },
              })
            : null;
    const bands = bandFetch ? await bandFetch.data : null;

    return {
        props: {
            bands: bands && bands.data ? bands.data : [],
        },
    };
};
