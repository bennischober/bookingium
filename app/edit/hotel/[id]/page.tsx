import { authOrRedirect } from "@/auth";
import { FormContainer } from "@/components/Layout/FormContainer";
import { IHotel } from "@/models/hotel";
import { serverSideFetch } from "@/utils/appHandles";
import { Metadata } from "next";
import SpecificHotelComponent from "./component";

export const metadata: Metadata = {
    title: "Update Hotel data",
};

export default async function Page({ params }: { params: { id: string } }) {
    const session = await authOrRedirect();

    const hotel = await serverSideFetch<IHotel>(`/api/hotel/${params.id}`, {
        userid: session.userid,
    });

    return (
        <FormContainer>
            <SpecificHotelComponent session={session} hotel={hotel} />
        </FormContainer>
    );
}
