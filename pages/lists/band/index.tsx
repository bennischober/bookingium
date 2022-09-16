import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { BandList } from "../../../components/Lists/BandList";
import { IBand } from "../../../models/band";
import { serverSideFetch } from "../../../utils/appHandles";

export interface BandPageProps {
    bands: IBand[];
}

export default function BandPage({ bands }: BandPageProps) {
    return (
        <PageTemplate title="Deal Memos">
            <BandList bands={bands} />
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });

    const data = await serverSideFetch("/api/band", { userid: session?.userid });

    return {
        props: {
            bands: data,
        },
    };
};
