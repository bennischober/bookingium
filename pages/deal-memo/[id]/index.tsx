import { Button, Center, Tabs, Text } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { CompleteDealMemoPageProps, DealEditFormValues } from "../../../types";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { SpecificPageHeader } from "../../../components/Layout/SpecificPageHeader";
import Link from "next/link";
import { VenueForm } from "../../../components/Forms/VenueForm";
import { HotelForm } from "../../../components/Forms/HotelForm";

// move jsx stuff to new component, if everything is finished and works properly

export default function CompleteDealMemoPage({
    memo,
    session,
}: CompleteDealMemoPageProps) {
    const [memoData, setMemoData] = useState<IDealMemo>(memo);
    const [bandData, setBandData] = useState<IBand>({} as IBand);
    const [venueData, setVenueData] = useState<IVenue>({} as IVenue);
    const [hotelData, setHotelData] = useState<IHotel>({} as IHotel);
    const router = useRouter();

    useEffect(() => {
        if (isPopulated<IBand>(memo.bandid)) {
            setBandData(memo.bandid);
        }
        if (isPopulated<IVenue>(memo.venueid)) {
            setVenueData(memo.venueid);
        }
        if (isPopulated<IHotel>(memo.hotelid)) {
            setHotelData(memo.hotelid);
        }
    }, [memo, bandData, venueData, hotelData]);

    // maybe move this to appHandles?
    const handleMemo = async (data: {}) => {
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
            `http://localhost:3000/api/deal-memo/${memo.dealId}`,
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
    const handleBand = async (data: {}) => {
        console.log(data);
    };

    const handleVenue = async (data: {}) => {
        console.log(data);
    };

    const handleHotel = async (data: {}) => {
        console.log(data);
    };

    return (
        <>
            <PageTemplate title={`Deal Memo of ${bandData.name}`}>
                <SpecificPageHeader
                    title={
                        <Link href={`/band/${bandData?.bandid}`}>
                            <Text<"a">
                                component="a"
                                variant="link"
                                href={`/band/${bandData?.bandid}`}
                            >
                                {bandData.name}
                            </Text>
                        </Link>
                    }
                    titleName={"Band"}
                    subTitle={`Date: ${dayjs(memoData.date).format(
                        "DD.MM.YYYY"
                    )} | Venue: ${venueData?.name} | Lopro: Coming back soon!`}
                    other={
                        <Button
                            variant="default"
                            onClick={() => {
                                router.push({
                                    pathname: "/contract",
                                    query: { id: memoData.dealId },
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
                        <Tabs.Tab value="lopro-data">
                            Local promoter data
                        </Tabs.Tab>
                        <Tabs.Tab value="hotel-data">Hotel data</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="deal-data">
                        <FormContainer>
                            <DealEditForm
                                handleMemos={handleMemo}
                                session={session}
                                data={memoData as DealEditFormValues}
                                bandName={bandData.name}
                                created={memoData.dm.created}
                            />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="band-data">
                        <FormContainer>
                                <BandForm
                                    session={session}
                                    handleData={handleBand}
                                    data={bandData}
                                />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="venue-data">
                        <FormContainer>
                                <VenueForm
                                    session={session}
                                    handleData={handleVenue}
                                    data={venueData}
                                />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="lopro-data">
                        <FormContainer>
                            <p>Coming back soon!</p>
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="hotel-data">
                        <FormContainer>
                            {nonEmptyObj(hotelData) ? (
                                <HotelForm
                                    session={session}
                                    handleData={handleHotel}
                                    data={hotelData}
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

    const data = await serverSideFetch(`/api/deal-memo/${id}`, {
        userid: session?.userid,
    });

    return {
        props: {
            session: session,
            memo: data,
        },
    };
};
