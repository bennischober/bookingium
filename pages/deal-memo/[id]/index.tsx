import { Button, Center, Tabs, Text } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdCheck, MdClose } from "react-icons/md";
import {
    isPopulated,
    nonEmptyObj,
    serverSideFetch,
} from "../../../utils/appHandles";
import { BandForm } from "../../../components/Forms/BandForm";
import { DealEditForm } from "../../../components/Forms/DealMemoForm";
import { IBand } from "../../../models/band";
import { IDealMemo } from "../../../models/deal-memo";
import { IHotel } from "../../../models/hotel";
import { IVenue } from "../../../models/venue";
import { CompleteDealMemoPageProps } from "../../../types";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { SpecificPageHeader } from "../../../components/Layout/SpecificPageHeader";
import Link from "next/link";
import { VenueForm } from "../../../components/Forms/VenueForm";
import { HotelForm } from "../../../components/Forms/HotelForm";
import { IPerson } from "../../../models/person";

// move jsx stuff to new component, if everything is finished and works properly

export default function CompleteDealMemoPage({
    memo,
    session,
    band,
    venue,
    hotel,
    persons,
}: CompleteDealMemoPageProps) {
    const router = useRouter();

    // maybe move this to appHandles?
    // => make a function to take parameters and finish for every handle here!
    const handleMemo = async (data: IDealMemo) => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Saving your data",
            message:
                "You will be notified wethere your data is saved or any problem occured",
            autoClose: false,
            disallowClose: true,
        });

        const res = await axios.put(
            `http://localhost:3000/api/deal-memo/${memo.dealid}`,
            { data: data },
            { params: { userid: session.userid } }
        );

        if (res.status === 200) {
            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Data saved",
                message: "Your data has been successsfully updated",
                icon: <MdCheck />,
                autoClose: 2000,
            });
            return;
        }
        // an error occured, show notification
        updateNotification({
            id: "load-data",
            color: "red",
            title: "An error occured",
            message: "Your data could not be saved",
            icon: <MdClose />,
            autoClose: 2000,
        });
    };

    // Note: For the put action new apis /[id]/index.ts will be needed!
    const handleBand = async (data: IBand) => {
        console.log(data);
    };

    const handleVenue = async (data: IVenue) => {
        console.log(data);
    };

    const handleHotel = async (data: IHotel) => {
        console.log(data);
    };

    return (
        <>
            <PageTemplate title={`Deal Memo of ${band?.name}`}>
                <SpecificPageHeader
                    title={
                        <Link href={`/band/${band?.bandid}`}>
                            <Text<"a">
                                component="a"
                                variant="link"
                                href={`/band/${band?.bandid}`}
                            >
                                {band?.name}
                            </Text>
                        </Link>
                    }
                    titleName={"Band"}
                    subTitle={`Date: ${dayjs(memo.date).format(
                        "DD.MM.YYYY"
                    )} | Venue: ${venue?.name}`}
                    other={
                        <Button
                            variant="default"
                            onClick={() => {
                                router.push({
                                    pathname: "/contract",
                                    query: { id: memo.dealid },
                                });
                            }}
                        >
                            Create contract
                        </Button>
                    }
                />
                <Tabs defaultValue="deal-data">
                    <Tabs.List>
                        <Tabs.Tab value="deal-data">Deal data</Tabs.Tab>
                        <Tabs.Tab value="band-data">Band data</Tabs.Tab>
                        <Tabs.Tab value="venue-data">Venue data</Tabs.Tab>
                        <Tabs.Tab value="hotel-data">Hotel data</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="deal-data">
                        <FormContainer>
                            <DealEditForm
                                handleMemos={handleMemo}
                                session={session}
                                data={memo}
                                created={memo.dm.created}
                            />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="band-data">
                        <FormContainer>
                            {nonEmptyObj(band) ? (
                                <BandForm
                                    session={session}
                                    handleData={handleBand}
                                    data={band}
                                    persons={persons}
                                    isEdit
                                />
                            ) : null}
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="venue-data">
                        <FormContainer>
                            {nonEmptyObj(venue) ? (
                                <VenueForm
                                    session={session}
                                    handleData={handleVenue}
                                    data={venue}
                                />
                            ) : null}
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="hotel-data">
                        <FormContainer>
                            {nonEmptyObj(hotel) ? (
                                <HotelForm
                                    session={session}
                                    handleData={handleHotel}
                                    data={hotel}
                                />
                            ) : (
                                // Idea: goto hotel add form with params of deal and add new hotel.
                                // If this is done, go back to this specific deal
                                // Note: Add fromPath!
                                <Center>
                                    <Button>Add Hotel Data</Button>
                                </Center>
                            )}
                        </FormContainer>
                    </Tabs.Panel>
                </Tabs>
            </PageTemplate>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
    const id = ctx.query.id;

    const data = await serverSideFetch<IDealMemo>(`/api/deal-memo/${id}`, {
        userid: session?.userid,
    });

    const band = isPopulated<IBand>(data.bandid)
        ? (data.bandid as IBand)
        : null;
    const venue = isPopulated<IVenue>(data.venueid)
        ? (data.venueid as IVenue)
        : null;
    const hotel = isPopulated<IHotel>(data.hotelid)
        ? (data.hotelid as IHotel)
        : null;

    const persons = await serverSideFetch<IPerson[]>(`/api/person`, {
        userid: session?.userid,
    });

    return {
        props: {
            session: session,
            memo: data,
            band: band,
            venue: venue,
            hotel: hotel,
            persons: persons,
        },
    };
};
