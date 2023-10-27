"use client";

import { useState } from "react";
import { Button, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import { MdCheck, MdClose, MdEdit, MdFileDownload } from "react-icons/md";
import { SpecificPageHeader } from "../../../components/Layout/SpecificPageHeader";
import Link from "next/link";
import { ContentContainer } from "../../../components/Layout/ContentContainer";
import { SpecificDealMemoPageContent } from "../../../components/SpecificPages/DealMemo";
import { CompleteDealMemoPageProps, SearchableIdProxyData } from "@/types";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { IDealMemo } from "@/models/deal-memo";
import { useRouter } from "next/navigation";
import { IHotel } from "@/models/hotel";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { clientSideFetch } from "@/utils/appHandles";

export default function SpecificDealMemoComponent({
    session,
    memo,
    band,
    venue,
    hotel,
    hotels,
}: CompleteDealMemoPageProps) {
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
        notifications.show({
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
                notifications.update({
                    id: "load-data",
                    color: "teal",
                    title: "Data saved",
                    message: "Your data has been successsfully updated",
                    icon: <MdCheck />,
                    loading: false,
                    autoClose: 2000,
                });
                return;
            }
        }

        // an error occured, show notification
        notifications.update({
            id: "load-data",
            color: "red",
            title: "An error occured",
            message: "Your data could not be saved",
            icon: <MdClose />,
            loading: false,
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
              label: c.name,
              value: c._id,
          }))
        : [];

    return (
        <>
            <SpecificPageHeader
                title={
                    <Link href={`/edit/band/${band?._id}`}>{band?.name}</Link>
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
                                leftSection={<MdFileDownload size={20} />}
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
                                leftSection={<MdEdit size={20} />}
                                onClick={() => {
                                    router.push(`/contract/${memo._id}`);
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
                    memo={memo}
                    hotelState={hotelState}
                    hotelAutocomplete={hotelAutocomplete}
                    handleMemo={handleMemo}
                    handleHotel={handleHotel}
                    handleSelectHotel={handleSelectHotel}
                    handleAddHotel={handleAddHotel}
                />
            </ContentContainer>
        </>
    );
}
