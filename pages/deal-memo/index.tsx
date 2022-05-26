import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "@mantine/form";
import {
    Autocomplete,
    Button,
    Container,
    Group,
    Modal,
    NumberInput,
    Paper,
    Space,
    Stack,
    Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { DealMemoProps } from "../../types";
import { IBand } from "../../models/band";
import mongoose from "mongoose";
import { useState } from "react";
import { BandForm } from "../../components/BandForm";

export interface DealMemoFormValues {
    band: string;
    date: Date;
    deal: string;
    price: Number;
    posters: Number;
    notes: string;
}

// Rework component and move interfaces
// also import {v4 as uuid4} from 'uuid'; to generate a unique id for deal memo

// add popups, if hotel/band/venue does not exits
// also add auto complete for band, venue, lopro, hotel

// split component stuff to own file; only leave session and payload validation in here
// also add new get request, if new band is added

export default function DealMemoPage({ session, payload }: DealMemoProps) {
    const [modalOpened, setModalOpened] = useState(false);

    const dealForm = useForm<DealMemoFormValues>({
        initialValues: {
            band: "",
            date: dayjs().toDate(),
            deal: "",
            price: 0,
            posters: 0,
            notes: "",
        },
        validate: (values: DealMemoFormValues) => ({
            band: values.band.length > 0 ? undefined : "Band is required",
            date:
                values.date.toString().length > 0
                    ? undefined
                    : "Date is required",
            deal: values.deal.length > 0 ? undefined : "Deal is required",
            price: values.price >= 0 ? undefined : "Price is required",
            posters: values.posters >= 0 ? undefined : "Posters is required",
        }),
    });

    const onDealSubmit = (values: DealMemoFormValues) => {
        let band = {} as IBand;
        payload.forEach((val) => {
            if (val.name === values.band) {
                band = val;
            }
        });

        if (!band) {
            console.log("band not found, aborting save action!");
            return;
        }

        const memoData = {
            _id: new mongoose.Types.ObjectId(),
            dealId: uuidv4(),
            deal: values.deal,
            bandid: band._id,
            date: values.date,
            price: values.price,
            posters: values.posters,
            notes: values.notes,
            dm: {
                userid: session.userid,
                created: dayjs().toISOString(),
                edited: dayjs().toISOString(),
            },
        };

        axios.post("/api/deal-memo", memoData);
    };

    const autoCompleteData = payload
        ? payload?.map((val) => {
              return val.name;
          })
        : [];

    return (
        <>
            <Container size="xs">
                <Paper withBorder shadow="md" p={30} mt={30} radius="xs">
                    <form
                        onSubmit={dealForm.onSubmit((values) =>
                            onDealSubmit(values)
                        )}
                    >
                        <Stack>
                            <Autocomplete
                                label="Choose a band"
                                placeholder="Band name"
                                data={autoCompleteData}
                                {...dealForm.getInputProps("band")}
                                required
                            />
                            <Button onClick={() => setModalOpened(true)}>
                                Add Band
                            </Button>
                        </Stack>
                        <Space h="xl" />
                        <Textarea
                            label="Deal"
                            placeholder="Deal information"
                            {...dealForm.getInputProps("deal")}
                            autosize
                            minRows={3}
                            required
                        />
                        <Space h="xl" />
                        <DatePicker
                            id="mantine-2wgfg6a6v"
                            label="Date"
                            defaultValue={dayjs().toDate()}
                            {...dealForm.getInputProps("date")}
                            required
                        />
                        <Space h="xl" />
                        <NumberInput
                            label="Price"
                            {...dealForm.getInputProps("price")}
                            min={0}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            required
                        />
                        <Space h="xl" />
                        <NumberInput
                            label="Posters"
                            {...dealForm.getInputProps("posters")}
                            min={0}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            required
                        />
                        <Space h="xl" />
                        <Textarea
                            label="Notes"
                            {...dealForm.getInputProps("notes")}
                            autosize
                            minRows={3}
                        />
                        <Space h="xl" />
                        <Button type="submit" fullWidth mt="xl">
                            Submit data
                        </Button>
                    </form>
                </Paper>
            </Container>
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Add a new Band"
            >
                <BandForm />
            </Modal>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // this throws an error, because the http headers will be sent by getSession and axios.get

    const session = await getSession({ req: ctx.req });
    const pl =
        session && session.userid
            ? await axios.get("http://localhost:3000/api/band", {
                  params: {
                      userid: session.userid,
                  },
              })
            : null;

    const payload = pl && (await pl.data) ? await pl.data : null;

    return {
        props: {
            session,
            payload: payload?.data,
        },
    };
};
