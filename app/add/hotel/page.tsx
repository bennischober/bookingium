import { auth } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { Metadata } from "next";
import HotelComponent from "./component";

export const metadata: Metadata = {
    title: "Create a new Hotel",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await auth();
    if (!session) return null;

    return (
        <FormContainer>
            <HotelComponent session={session} />
        </FormContainer>
    );
}
