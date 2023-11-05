import { auth } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { Metadata } from "next";
import PersonComponent from "./component";

export const metadata: Metadata = {
    title: "Create a new Person",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await auth();
    if (!session) return null;

    return (
        <FormContainer>
            <PersonComponent session={session} />
        </FormContainer>
    );  
}
