import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { BandForm } from "../../../components/Forms/BandForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { IBand } from "../../../models/band";
import { ReqAuthProps } from "../../../types";

export default function AddBandPage({ session }: ReqAuthProps) {
    const handleSave = async (data: IBand) => {
        // post band data
        const ret = await axios.post(
            "/api/band",
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);
    };

    return (
        <PageTemplate title={"Add a Band"}>
            <FormContainer>
                <BandForm session={session} handleData={handleSave} />
            </FormContainer>
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
    
    return {
        props: {
            session,
        },
    };
};
