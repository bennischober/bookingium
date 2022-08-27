import { Button, Center, Space, Tabs, Text, Title } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { isPopulated, serverSideFetch } from "../../../utils/appHandles";
import { BandEditForm } from "../../../components/Forms/BandForm";
import { DealEditForm } from "../../../components/Forms/DealMemoForm";
import { HotelEditForm } from "../../../components/Forms/HotelForm";
import { LoproEditForm } from "../../../components/Forms/LoproForm";
import { VenueEditForm } from "../../../components/Forms/VenueForm";
import { IBand } from "../../../models/band";
import { IDealMemo } from "../../../models/deal-memo";
import { IHotel } from "../../../models/hotel";
import { ILopro } from "../../../models/lopro";
import { IVenue } from "../../../models/venue";
import { CompleteDealMemoPageProps } from "../../../types";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { BackButton } from "../../../components/LayoutElements/BackButton";

// move interface to types file
// move jsx stuff to new component, if everything is finished and works properly

// might need to think about how to handle the hotel data. Initially there might not be any hotel

export default function CompleteDealMemoPage({
    memo,
    session,
}: CompleteDealMemoPageProps) {
    const [memoData, setMemoData] = useState<IDealMemo>(memo);
    const [bandData, setBandData] = useState<IBand>({} as IBand);
    const [venueData, setVenueData] = useState<IVenue>({} as IVenue);
    const [loproData, setLoproData] = useState<ILopro>({} as ILopro);
    const [hotelData, setHotelData] = useState<IHotel>({} as IHotel);
    const router = useRouter();

    useEffect(() => {
        if (isPopulated<IBand>(memo.bandid)) {
            setBandData(memo.bandid);
        }
        if (isPopulated<IVenue>(memo.venueid)) {
            setVenueData(memo.venueid);
        }
        if (isPopulated<ILopro>(memo.loproid)) {
            setLoproData(memo.loproid);
        }
        if (isPopulated<IHotel>(memo.hotelid)) {
            setHotelData(memo.hotelid);
        }
    }, [memo, bandData, venueData, loproData, hotelData]);

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
            `http://localhost:3000/api/deal-memo/${memo._id}`,
            { data: data },
            { params: { userid: session.userid } }
        );

        if (res.status === 200) {
            setMemoData(res.data.data);

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

    const handleLopro = async (data: {}) => {
        console.log(data);
    };

    const handleHotel = async (data: {}) => {
        console.log(data);
    };

    return (
        <>
            <PageTemplate title={`Deal Memo of ${bandData.name}`}>
                <BackButton />
                <Space h="xl" />
                <Title>Deal: {memoData.dealId}</Title>
                <Space h="xl" />
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
                <Space h="xl" />
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
                                data={{
                                    deal: memoData.deal,
                                    date: dayjs(memoData.date).toDate(),
                                    fee: memoData.fee,
                                    ticketPriceVVK: memoData.ticketPriceVVK,
                                    ticketPriceAK: memoData.ticketPriceAK,
                                    posters: memoData.posters,
                                    status: memoData.status,
                                    notes: memoData.notes,
                                }}
                                bandName={bandData.name}
                                created={memoData.dm.created}
                            />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="band-data">
                        <FormContainer>
                            <BandEditForm
                                session={session}
                                handleBand={handleBand}
                                data={{
                                    bandName: bandData?.name,
                                    notes: bandData?.notes,
                                    companyName: bandData?.company?.name,
                                    vatNumber: bandData?.company?.vatNumber,
                                    ustNumber: bandData?.company?.ustNumber,
                                    streetNumber:
                                        bandData?.company?.address
                                            ?.streetNumber,
                                    street: bandData?.company?.address?.street,
                                    addressSuffix:
                                        bandData?.company?.address
                                            ?.addressSuffix,
                                    zipCode:
                                        bandData?.company?.address?.zipCode,
                                    city: bandData?.company?.address?.city,
                                    state: bandData?.company?.address?.state,
                                    country:
                                        bandData?.company?.address?.country,
                                    countryCode:
                                        bandData?.company?.address?.countryCode,
                                    email: bandData?.company?.contact?.email,
                                    phone: bandData?.company?.contact?.phone,
                                    mobilePhone:
                                        bandData.company?.contact?.mobilePhone,
                                    homepage:
                                        bandData?.company?.contact?.homepage,
                                    members: bandData?.members,
                                }}
                            />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="venue-data">
                        <FormContainer>
                            <VenueEditForm
                                session={session}
                                handleVenue={handleVenue}
                                data={{
                                    venue: venueData?.venue,
                                    capacity: venueData?.capacity,
                                    notes: venueData?.notes,
                                    companyName: venueData?.company?.name,
                                    vatNumber: venueData?.company?.vatNumber,
                                    ustNumber: venueData?.company?.ustNumber,
                                    streetNumber:
                                        venueData?.company?.address
                                            ?.streetNumber,
                                    street: venueData?.company?.address?.street,
                                    addressSuffix:
                                        venueData?.company?.address
                                            ?.addressSuffix,
                                    zipCode:
                                        venueData?.company?.address?.zipCode,
                                    city: venueData?.company?.address?.city,
                                    state: venueData?.company?.address?.state,
                                    country:
                                        venueData?.company?.address?.country,
                                    countryCode:
                                        venueData?.company?.address
                                            ?.countryCode,
                                    email: venueData?.company?.contact?.email,
                                    phone: venueData?.company?.contact?.phone,
                                    mobilePhone:
                                        venueData?.company?.contact
                                            ?.mobilePhone,
                                    homepage:
                                        venueData?.company?.contact?.homepage,
                                    contactPerson: venueData?.contactPerson,
                                }}
                            />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="lopro-data">
                        <FormContainer>
                            <LoproEditForm
                                session={session}
                                handleLopro={handleLopro}
                                data={{
                                    name: loproData?.name,
                                    personPhone: loproData?.phone,
                                    personMobilePhone: loproData?.mobilePhone,
                                    personEmail: loproData?.email,
                                    notes: loproData?.notes,
                                    companyName: loproData?.company?.name,
                                    vatNumber: loproData?.company?.vatNumber,
                                    ustNumber: loproData?.company?.ustNumber,
                                    streetNumber:
                                        loproData?.company?.address
                                            ?.streetNumber,
                                    street: loproData?.company?.address?.street,
                                    addressSuffix:
                                        loproData?.company?.address
                                            ?.addressSuffix,
                                    zipCode:
                                        loproData?.company?.address?.zipCode,
                                    city: loproData?.company?.address?.city,
                                    state: loproData?.company?.address?.state,
                                    country:
                                        loproData?.company?.address?.country,
                                    countryCode:
                                        loproData?.company?.address
                                            ?.countryCode,
                                    email: loproData?.company?.contact?.email,
                                    phone: loproData?.company?.contact?.phone,
                                    mobilePhone:
                                        loproData?.company?.contact
                                            ?.mobilePhone,
                                    homepage:
                                        loproData?.company?.contact?.homepage,
                                }}
                            />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="hotel-data">
                        <FormContainer>
                            {hotelData && Object.keys(hotelData).length > 0 ? (
                                <HotelEditForm
                                    session={session}
                                    handleHotel={handleHotel}
                                    data={{
                                        name: hotelData?.name,
                                        notes: hotelData?.notes,
                                        companyName: loproData?.company?.name,
                                        vatNumber:
                                            loproData?.company?.vatNumber,
                                        ustNumber:
                                            loproData?.company?.ustNumber,
                                        streetNumber:
                                            loproData?.company?.address
                                                ?.streetNumber,
                                        street: loproData?.company?.address
                                            ?.street,
                                        addressSuffix:
                                            loproData?.company?.address
                                                ?.addressSuffix,
                                        zipCode:
                                            loproData?.company?.address
                                                ?.zipCode,
                                        city: loproData?.company?.address?.city,
                                        state: loproData?.company?.address
                                            ?.state,
                                        country:
                                            loproData?.company?.address
                                                ?.country,
                                        countryCode:
                                            loproData?.company?.address
                                                ?.countryCode,
                                        email: loproData?.company?.contact
                                            ?.email,
                                        phone: loproData?.company?.contact
                                            ?.phone,
                                        mobilePhone:
                                            loproData?.company?.contact
                                                ?.mobilePhone,
                                        homepage:
                                            loproData?.company?.contact
                                                ?.homepage,
                                    }}
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
