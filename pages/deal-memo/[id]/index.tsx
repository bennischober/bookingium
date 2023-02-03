import { useState } from "react";
import { Button, Center, Divider, Modal, Tabs, Text } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdCheck, MdClose } from "react-icons/md";
import {
    clientSideFetch,
    isPopulated,
    nonEmptyObj,
    serverSideFetch,
    toAutocomplete,
    updateData,
} from "../../../utils/appHandles";
import { DealEditForm } from "../../../components/Forms/DealMemoForm";
import { IBand } from "../../../models/band";
import { IDealMemo } from "../../../models/deal-memo";
import { IHotel } from "../../../models/hotel";
import { IVenue } from "../../../models/venue";
import { CompleteDealMemoPageProps, SearchableIdProxyData } from "../../../types";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { SpecificPageHeader } from "../../../components/Layout/SpecificPageHeader";
import Link from "next/link";
import { HotelForm } from "../../../components/Forms/HotelForm";
import { ContentContainer } from "../../../components/Layout/ContentContainer";
import { SearchableIdProxy } from "../../../components/FormElements/Searchable";
import { useForm } from "@mantine/form";

// move jsx stuff to new component, if everything is finished and works properly

export default function CompleteDealMemoPage({
    memo,
    session,
    band,
    venue,
    hotel,
    hotels,
}: CompleteDealMemoPageProps) {
    const [opened, setOpened] = useState(false);
    const [memoState, setMemoState] = useState(memo);
    const [hotelState, setHotelState] = useState(hotel);

    const router = useRouter();

    const Form = useForm({
        initialValues: {
            hotelid: "",
        },
    });

    // maybe move this to appHandles?
    // => make a function to take parameters and finish for every handle here!
    const handleMemo = async (data: IDealMemo) => {
        console.log("handleMemo called", data);

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
    const handleHotel = async (data: IHotel) => {
        console.log(data);
    };

    const handleAddHotel = async (data: IHotel) => {
        // save hotel to db
        // add hotel to deal memo
        console.log(data);
    };

    const handleChooseHotel = async (name: string) => {
        if (!hotels) {
            console.error("No hotels found");
            return;
        }
        // get hotel from hotels string array
        const hotel = hotels.find((hotel) => hotel.name === name);
        
        if(!hotel) {
            console.error("No hotel found");
            return;
        }

        const m = {
            hotelid: hotel._id,
            dm: {
                userid: memo.dm.userid,
                created: memo.dm.created,
                edited: dayjs().toISOString(),
            }

        };

        // m.hotelid = hotel._id;
        // m.dm = {
        //     userid: memo.dm.userid,
        //     created: memo.dm.created,
        //     edited: dayjs().toISOString(),
        // }

        // m.bandid = memo.bandid._id;
        // m.venueid = memo.venueid._id;
        // m.lopro.company = memo.lopro.company._id;
        // m.lopro.person = memo.lopro.person._id;
        // delete m["_id"];
        // delete m["__v"];
        // delete m["dealid"];

        // doesnt work, hotelid will not be updated / added :(


        // works with memo._id, but not with memo.dealid => on hoppscotch it works with dealid!
        console.log(m, "dealid", memo.dealid);
        const res = await updateData(`/api/deal-memo/${memo._id}`, m, session.userid);
        console.log(res);

        // const t = await clientSideFetch(`/api/deal-memo/${memo.dealid}`, {userid: session.userid});
        // console.log(t);

        // update memoState
        // refetch memo using serverSideFetch
        // const m = await serverSideFetch<IDealMemo>(`/api/deal-memo/${memo.dealid}`, session.userid);
        // setMemoState(m);
        // update hotelState
        // setHotelState(hotel);
    };

    const hotelAutocomplete: SearchableIdProxyData[] = hotels ? hotels.map(
        (c) => ({
            display: c.name,
            value: c._id,
        })
    ) : [];

    return (
        <>
            <PageTemplate title={`Deal Memo of ${band?.name}`}>
                <SpecificPageHeader
                    title={
                        <Link href={`/edit/band/${band?.bandid}`}>
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
                <ContentContainer>
                    <Tabs defaultValue="deal-data">
                        <Tabs.List>
                            <Tabs.Tab value="deal-data">Deal data</Tabs.Tab>
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
                        <Tabs.Panel value="hotel-data">
                            <FormContainer>
                                {nonEmptyObj(hotelState) ? (
                                    <HotelForm
                                        session={session}
                                        handleData={handleHotel}
                                        data={hotelState}
                                    />
                                ) : (
                                    // refers to #304
                                    // Idea: goto hotel add form with params of deal and add new hotel.
                                    // If this is done, go back to this specific deal
                                    // Note: Add fromPath!

                                    <>
                                        <form
                                            onSubmit={Form.onSubmit((values) =>
                                                handleChooseHotel(
                                                    values.hotelid
                                                )
                                            )}
                                        >
                                            <SearchableIdProxy
                                                Form={Form}
                                                label={"Hotels"}
                                                data={hotelAutocomplete}
                                                inputProps={"hotelid"}
                                            />

                                            <Divider my="xl" />

                                            <Center>
                                                {Form.values.hotelid !== "" ? (
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        mt="xl"
                                                    >
                                                        Save Hotel
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() =>
                                                            setOpened(true)
                                                        }
                                                    >
                                                        Add Hotel Data
                                                    </Button>
                                                )}
                                            </Center>
                                        </form>
                                    </>
                                )}
                            </FormContainer>
                        </Tabs.Panel>
                    </Tabs>
                </ContentContainer>
            </PageTemplate>

            <Modal opened={opened} onClose={() => setOpened(false)} size="xl">
                <HotelForm session={session} handleData={handleAddHotel} />
            </Modal>
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

    const hotels =
        hotel == null
            ? await serverSideFetch<IHotel>("/api/hotel", {
                  userid: session?.userid,
              })
            : [];

    return {
        props: {
            session: session,
            band: band,
            hotel: hotel,
            memo: data,
            venue: venue,
            hotels: hotels,
        },
    };
};
