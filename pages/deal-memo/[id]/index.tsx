import { useState } from "react";
import { Button, Tooltip } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdCheck, MdClose, MdEdit, MdFileDownload } from "react-icons/md";
import {
    clientSideFetch,
    isPopulated,
    serverSideFetch,
} from "../../../utils/appHandles";
import { IBand } from "../../../models/band";
import { IDealMemo } from "../../../models/deal-memo";
import { IHotel } from "../../../models/hotel";
import { IVenue } from "../../../models/venue";
import {
    CompleteDealMemoPageProps,
    SearchableIdProxyData,
} from "../../../types";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { SpecificPageHeader } from "../../../components/Layout/SpecificPageHeader";
import Link from "next/link";
import { ContentContainer } from "../../../components/Layout/ContentContainer";
import { SpecificDealMemoPageContent } from "../../../components/SpecificPages/DealMemo";
import { callAPI, withNotification } from "../../../utils/apiHandler";
import { auth } from "../../../auth";

export default function CompleteDealMemoPage({
    memo,
    session,
    band,
    venue,
    hotel,
    hotels,
}: CompleteDealMemoPageProps) {
    const [memoState, setMemoState] = useState(memo);
    const [hotelState, setHotelState] = useState(hotel);

    const router = useRouter();

    // maybe move this to appHandles?
    // => make a function to take parameters and finish for every handle here!
    const handleMemo = async (data: IDealMemo) => {
        await withNotification(
            () =>
                callAPI<IDealMemo>(
                    `/deal-memo/${memo._id}`,
                    "PUT",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "PUT"
        );
    };

    // Updates the selected hotel (hotel data) for the deal memo
    const handleHotel = async (data: IHotel) => {
        if (!hotelState) {
            console.error("Can't update hotel, no hotel selected");
            return;
        }

        await withNotification(
            () =>
                callAPI<IHotel>(
                    `/hotel/${hotelState._id}`,
                    "PUT",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "PUT"
        );
    };

    // adds new hotel to db and to deal memo
    const handleAddHotel = async (data: IHotel) => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Saving your data",
            message:
                "You will be notified wethere your data is saved or any problem occured",
            autoClose: false,
            withCloseButton: false,
        });

        const res = await axios.post(
            `/api/hotel`,
            { data: data },
            { params: { userid: session.userid } }
        );

        if (res.status === 200) {
            // add hotel to deal memo
            const res2 = await axios.put(
                `/api/deal-memo/${memo._id}`,
                {
                    data: {
                        hotelid: res.data.data._id,
                        edited: dayjs().toISOString(),
                    },
                },
                { params: { userid: session.userid } }
            );

            if (res2.status === 200) {
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

    // select a hotel, if not initially selected
    // can also be used to change the hotel
    const handleSelectHotel = async (id: string) => {
        if (!hotels) {
            console.error("No hotels found");
            return;
        }

        const res = await axios.put(
            `/api/deal-memo/${memo._id}`,
            {
                data: {
                    hotelid: id,
                    edited: dayjs().toISOString(),
                },
            },
            { params: { userid: session.userid } }
        );

        if (res.status === 200) {
            // fetch hotel
            const hotel = await clientSideFetch<IHotel>(`/api/hotel/${id}`, {
                userid: session.userid,
            });
            setHotelState(hotel);
        }
    };

    const hotelAutocomplete: SearchableIdProxyData[] = hotels
        ? hotels.map((c) => ({
              display: c.name,
              value: c._id,
          }))
        : [];

    return (
        <>
            <PageTemplate title={`Deal Memo of ${band?.name}`}>
                <SpecificPageHeader
                    title={
                        <Link href={`/edit/band/${band?._id}`}>
                            {band?.name}
                        </Link>
                    }
                    titleName={"Band"}
                    subTitle={`Date: ${dayjs(memo.date).format(
                        "DD.MM.YYYY"
                    )} | Venue: ${venue?.name}`}
                    other={
                        // move this to seperate component!

                        // could use deal memo id and session
                        // to fetch all other missing data to
                        // generate PDF
                        <Button.Group>
                            <Tooltip
                                label="Download default PDF with deal memo values"
                                position="bottom"
                                color="blue"
                                withArrow
                            >
                                <Button
                                    variant="default"
                                    leftIcon={<MdFileDownload size={20} />}
                                >
                                    Download contract
                                </Button>
                            </Tooltip>
                            <Tooltip
                                label="Replace default values with custom data"
                                position="bottom"
                                color="blue"
                                withArrow
                            >
                                <Button
                                    variant="default"
                                    leftIcon={<MdEdit size={20} />}
                                    onClick={() => {
                                        router.push({
                                            pathname: `/contract/${memo._id}`,
                                        });
                                    }}
                                >
                                    Customize contract
                                </Button>
                            </Tooltip>
                        </Button.Group>
                    }
                />
                <ContentContainer>
                    <SpecificDealMemoPageContent
                        session={session}
                        memo={memoState}
                        hotelState={hotelState}
                        hotelAutocomplete={hotelAutocomplete}
                        handleMemo={handleMemo}
                        handleHotel={handleHotel}
                        handleSelectHotel={handleSelectHotel}
                        handleAddHotel={handleAddHotel}
                    />
                </ContentContainer>
            </PageTemplate>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await auth(context);
    const id = context.query.id;

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

    // fetch hotels, if not already selected
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
