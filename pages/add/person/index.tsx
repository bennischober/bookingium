import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PersonForm } from "../../../components/Forms/PersonForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { IPerson } from "../../../models/person";
import { ReqAuthProps } from "../../../types";

export default function AddPersonPage({ session }: ReqAuthProps) {
    const handleSave = async (data: IPerson) => {
        // post person data
        const ret = await axios.post(
            "/api/person",
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);
    };

    return (
        <PageTemplate title={"Add a Person"}>
            <FormContainer>
                <PersonForm session={session} handleData={handleSave} />
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
