import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { HotelForm } from "../../../components/Forms/HotelForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { IHotel } from "../../../models/hotel";
import { ReqAuthProps } from "../../../types";

export default function AddHotelPage({ session }: ReqAuthProps) {
    const handleSave = async (data: IHotel) => {
        // post band data
        const ret = await axios.post(
            "/api/hotel",
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);
    };

    return (
        <PageTemplate title={"Add a Band"}>
            <FormContainer>
                <HotelForm session={session} handleData={handleSave} />
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
