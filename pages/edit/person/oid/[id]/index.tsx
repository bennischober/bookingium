import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { PersonForm } from "../../../../../components/Forms/PersonForm";
import { FormContainer } from "../../../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../../../components/Layout/PageTemplate";
import { BackButton } from "../../../../../components/LayoutElements/BackButton";
import { IPerson } from "../../../../../models/person";
import { SingleEditPageProps } from "../../../../../types";
import { clientSideFetch, serverSideFetch } from "../../../../../utils/appHandles";

export default function EditPersonOIDPage({ session, data }: SingleEditPageProps<IPerson>) {
    const [person, setPerson] = useState<IPerson>(data);

    const handleSave = async (data: IPerson) => {
        // put person data
        const ret = await axios.put(
            `/api/person/${data.personid}`,
            { data: data },
            { params: { userid: session.userid } }
        );
        console.log(ret.data, ret.status);

        const refetched = await clientSideFetch<IPerson>(`/api/person/${data.personid}`, {
            userid: session?.userid,
        });
        console.log(refetched);
        setPerson(refetched);
    };

    return (
        <PageTemplate title={`Edit ${data.firstName} ${data.lastName}`}>
            <BackButton />
            <FormContainer>
                <PersonForm session={session} handleData={handleSave} data={person} />
            </FormContainer>
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });

    const data = await serverSideFetch<IPerson>(`/api/person/oid/${ctx.query.id}`, {
        userid: session?.userid,
    });
    
    return {
        props: {
            session,
            data,
        },
    };
};
