"use client";

import { SearchableIdProxy } from "@/components/FormElements/Searchable";
import { FormContainer } from "@/components/Layout/FormContainer";
import { IDealMemo } from "@/models/deal-memo";
import { IHotel } from "@/models/hotel";
import { SearchableIdProxyData } from "@/types";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Button, Center, Divider, Modal, Space, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";

interface HotelComponentProps {
    session: Session;
    memoId: string;
    hotels: IHotel[] | IHotel | null | undefined;
}

export function HotelComponent({
    session,
    memoId,
    hotels,
}: HotelComponentProps) {
    const [opened, setOpened] = useState(false);
    const Form = useForm({
        initialValues: {
            hotelid: "",
        },
    });

    const handleSelectHotel = async (hotelId: string) => {
        await withNotification(
            () =>
                callAPI<IDealMemo>(
                    `/deal-memo/${memoId}`,
                    "PUT",
                    {
                        data: {
                            hotelid: hotelId,
                            edited: dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
                        },
                    },
                    { userid: session.userid }
                ),
            undefined,
            "PUT"
        );
    };

    const hotelAutocomplete: SearchableIdProxyData[] =
        hotels && Array.isArray(hotels)
            ? hotels.map((c) => ({
                  label: c.name,
                  value: c._id,
              }))
            : [];

    const hotelForm = (
        <form
            onSubmit={Form.onSubmit((value) =>
                handleSelectHotel(value.hotelid)
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
                <Button type="submit">Save Hotel</Button>
            </Center>
        </form>
    );

    return (
        <>
            <FormContainer>
                {hotels && !Array.isArray(hotels) ? (
                    <>
                        <Text fw={700}>Selected Hotel</Text>
                        <Space h="md" />
                        <Text>{hotels.name}</Text>
                        <Text>
                            {hotels.address.street}{" "}
                            {hotels.address.streetNumber}{" "}
                            {hotels.address.addressSuffix}
                        </Text>
                        <Text>
                            {hotels.address.zipCode} {hotels.address.city}
                        </Text>
                        <Space h="md" />
                        <Link href={`/edit/hotel/${hotels._id}`}>
                            <Button variant="default">View Hotel</Button>
                        </Link>
                        <Space h="xl" />
                        <Center>
                            <Button onClick={() => setOpened(true)}>
                                Change Hotel
                            </Button>
                        </Center>
                    </>
                ) : (
                    <>{hotelForm}</>
                )}
            </FormContainer>
            <Modal opened={opened} onClose={() => setOpened(false)} size="lg">
                {hotelForm}
            </Modal>
        </>
    );
}
