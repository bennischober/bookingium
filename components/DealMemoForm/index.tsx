import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
    Button,
    Container,
    Modal,
    NumberInput,
    Paper,
    Space,
    Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IBand } from "../../models/band";
import { DealMemoFormProps, DealMemoFormValues } from "../../types";
import { BandForm } from "../BandForm";
import { SearchOrAdd } from "../SearchOrAdd";

// create component with autocomplete and create button only for further use (band, venue, lopro, hotel)

export default function DealMemoForm({
    bands,
    session,
    fetchBands,
    fetchMemos,
    closeForm,
}: DealMemoFormProps) {
    const [bandModalOpened, setBandModalOpened] = useState(false);

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

    const onDealSubmit = async (values: DealMemoFormValues) => {
        let band = {} as IBand;
        bands.forEach((val) => {
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

        await axios.post("/api/deal-memo", { data: memoData });

        if (closeForm) closeForm();
        dealForm.reset();

        // await => refetch data
        fetchMemos();
    };

    const closeModals = () => {
        setBandModalOpened(false);
    }

    const autoCompleteData = bands
        ? bands?.map((val) => {
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
                        <SearchOrAdd
                            ac={{
                                data: autoCompleteData,
                                useForm: dealForm,
                                required: true,
                                label: "Choose a band",
                                placeholder: "Band name",
                                inputProps: "band",
                            }}
                            md={{
                                button: "Add Band",
                                handleOpen: setBandModalOpened,
                            }}
                        />
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
                opened={bandModalOpened}
                onClose={() => setBandModalOpened(false)}
                title="Add a new Band"
                size="xl"
                overflow="inside"
                centered
            >
                <BandForm fetchBands={fetchBands} session={session} close={closeModals} />
            </Modal>
        </>
    );
}