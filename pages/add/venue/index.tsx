import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { VenueForm } from "../../../components/Forms/VenueForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { IVenue } from "../../../models/venue";
import { ReqAuthProps } from "../../../types";

export default function AddHotelPage({ session }: ReqAuthProps) {
    const handleSave = async (data: IVenue) => {
        // post band data
        const ret = await axios.post(
            "/api/venue",
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);
    };

    return (
        <PageTemplate title={"Add a Venue"}>
            <FormContainer>
                <VenueForm session={session} handleData={handleSave} />
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
