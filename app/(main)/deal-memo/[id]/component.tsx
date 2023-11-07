"use client";

import { useState } from "react";
import { Button, Modal, Tooltip } from "@mantine/core";
import dayjs from "dayjs";
import { MdCheck, MdClose, MdSettings, MdOutlineNoteAdd } from "react-icons/md";
import { SpecificPageHeader } from "@/components/Layout/SpecificPageHeader";
import Link from "next/link";
import { ContentContainer } from "@/components/Layout/ContentContainer";
import { SpecificDealMemoPageContent } from "@/components/SpecificPages/DealMemo";
import { SearchableIdProxyData } from "@/types";
import { callAPI, getAPIBaseUrl, withNotification } from "@/utils/apiHandler";
import { IDealMemo } from "@/models/deal-memo";
import { useRouter } from "next/navigation";
import { IHotel } from "@/models/hotel";
import { notifications } from "@mantine/notifications";
import { clientSideFetch } from "@/utils/appHandles";
import { Session } from "next-auth";
import { IBand } from "@/models/band";
import { IVenue } from "@/models/venue";
import { ContractPdfForm } from "@/components/Forms/ContractPdfForm";

interface SpecificDealMemoComponentProps {
    session: Session;
    id: string;
    memo: IDealMemo;
    band?: IBand;
    venue?: IVenue;
    hotel?: IHotel;
    hotels?: IHotel[];
}

export default function SpecificDealMemoComponent({
    session,
    id,
    memo,
    band,
    venue,
    hotel,
    hotels,
}: SpecificDealMemoComponentProps) {
    // replace with signals in future!
    const [hotelState, setHotelState] = useState(hotel);
    const [modalOpen, setModalOpen] = useState(false);

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

        // could be replaced with clientSideFetch
        try {
            const hotelUrl: URL = new URL("/api/hotel", getAPIBaseUrl());
            hotelUrl.searchParams.append("userid", session.userid);
            const res = await fetch(hotelUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: data }),
            });

            if (!res.ok) throw new Error("Failed to save hotel data");

            const resData = await res.json();
            // add hotel to deal memo
            const dealUrl: URL = new URL(
                `/api/deal-memo/${memo._id}`,
                getAPIBaseUrl()
            );
            dealUrl.searchParams.append("userid", session.userid);
            const res2 = await fetch(dealUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        hotelid: resData.data._id,
                        edited: dayjs().toISOString(),
                    },
                }),
            });

            if (!res2.ok) throw new Error("Failed to save deal memo data");

            notifications.update({
                id: "load-data",
                color: "teal",
                title: "Data saved",
                message: "Your data has been successsfully updated",
                icon: <MdCheck />,
                loading: false,
                autoClose: 2000,
            });
        } catch (error: unknown) {
            // log to server with e.g. sentry
            notifications.update({
                id: "load-data",
                color: "red",
                title: "An error occured",
                message: "Your data could not be saved",
                icon: <MdClose />,
                loading: false,
                autoClose: 2000,
            });
        }
    };

    // select a hotel, if not initially selected
    // can also be used to change the hotel
    const handleSelectHotel = async (id: string) => {
        if (!hotels) {
            console.error("No hotels found");
            return;
        }

        try {
            await withNotification<IDealMemo>(
                () =>
                    callAPI(
                        `/deal-memo/${memo._id}`,
                        "PUT",
                        {
                            data: {
                                hotelid: id,
                                edited: dayjs().toISOString(),
                            },
                        },
                        { userid: session.userid }
                    ),
                undefined,
                "PUT"
            );

            // fetch hotel
            const hotel = await clientSideFetch<IHotel>(`/api/hotel/${id}`, {
                userid: session.userid,
            });
            setHotelState(hotel);
        } catch (error: unknown) {
            // remove in prod, replace with logging to server e.g. sentry
            console.log(error);
        }
    };

    const onPdfView = () => {
        router.push(`/contract/${memo._id}`);
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
                            label="Replace default values with custom data"
                            position="bottom"
                            color="blue"
                            withArrow
                        >
                            <Button
                                variant="default"
                                leftSection={<MdSettings size={20} />}
                                onClick={() => setModalOpen(true)}
                            >
                                Contract settings
                            </Button>
                        </Tooltip>
                        <Link href={`/itinerary/${id}`}>
                            <Button
                                variant="default"
                                leftSection={<MdOutlineNoteAdd size={20} />}
                            >
                                Create an Itinerary
                            </Button>
                        </Link>
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
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Update contract data"
                size="xl"
                centered
            >
                <ContractPdfForm
                    onClose={() => {
                        setModalOpen(false);
                    }}
                    onPdfView={onPdfView}
                />
            </Modal>
        </>
    );
}
