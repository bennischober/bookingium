import { useState } from "react";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
    Button,
    Container,
    Group,
    Modal,
    NumberInput,
    Paper,
    Select,
    Space,
    Textarea,
    Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IBand } from "../../models/band";
import {
    DealEditFormProps,
    DealEditFormValues,
    DealMemoFormProps,
    DealMemoFormValues,
} from "../../types";
import { BandForm } from "../BandForm";
import { SearchOrAdd } from "../SearchOrAdd";
import { VenueForm } from "../VenueForm";

export function DealMemoForm({
    bands,
    session,
    handleMemos,
    handleBands,
    handleVenues,
    handleLopros,
    handleHotels,
    closeForm,
}: DealMemoFormProps) {
    const [bandModalOpened, setBandModalOpened] = useState(false);
    const [venueModalOpened, setVenueModalOpened] = useState(false);

    const dealForm = useForm<DealMemoFormValues>({
        initialValues: {
            band: "",
            date: dayjs().toDate(),
            deal: "",
            fee: 0,
            ticketPriceVVK: 0,
            ticketPriceAK: 0,
            posters: 0,
            status: "pending",
            notes: "",
        },
        validate: (values: DealMemoFormValues) => ({
            band: values.band.length > 0 ? undefined : "Band is required",
            date:
                values.date.toString().length > 0
                    ? undefined
                    : "Date is required",
            deal: values.deal.length > 0 ? undefined : "Deal is required",
            fee: values.fee >= 0 ? undefined : "Price is required",
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
            fee: values.fee,
            ticketPriceVVK: values.ticketPriceVVK,
            ticketPriceAK: values.ticketPriceAK,
            posters: values.posters,
            status: values.status,
            notes: values.notes,
            dm: {
                userid: session.userid,
                created: dayjs().toISOString(),
                edited: dayjs().toISOString(),
            },
        };

        handleMemos(memoData);

        if (closeForm) closeForm();
        dealForm.reset();
    };

    const closeModals = () => {
        setBandModalOpened(false);
        setVenueModalOpened(false);
    };

    // useMemo?
    const bandsAutoComplete = bands
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
                                data: bandsAutoComplete,
                                useForm: dealForm,
                                required: true,
                                label: "Choose a band",
                                placeholder: "Band name",
                                inputProps: "band",
                            }}
                            md={{
                                button: "Add band",
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
                            label="Fee"
                            icon="€"
                            {...dealForm.getInputProps("fee")}
                            min={0}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            required
                        />
                        <Space h="xl" />
                        <Group grow>
                            <NumberInput
                                label="Ticked VVK Price"
                                icon="€"
                                {...dealForm.getInputProps("ticketPriceVVK")}
                                min={0}
                                stepHoldDelay={500}
                                stepHoldInterval={(t) =>
                                    Math.max(1000 / t ** 2, 25)
                                }
                                required
                            />
                            <NumberInput
                                label="Ticket AK Price"
                                icon="€"
                                {...dealForm.getInputProps("ticketPriceAK")}
                                min={0}
                                stepHoldDelay={500}
                                stepHoldInterval={(t) =>
                                    Math.max(1000 / t ** 2, 25)
                                }
                                required
                            />
                        </Group>
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
                        <Select
                            label="Status"
                            {...dealForm.getInputProps("status")}
                            data={[
                                {
                                    value: "pending",
                                    label: "Pending",
                                },
                                {
                                    value: "accepted",
                                    label: "Accepted",
                                },
                                {
                                    value: "rejected",
                                    label: "Rejected",
                                },
                            ]}
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
                        <SearchOrAdd
                            ac={{
                                data: bandsAutoComplete,
                                useForm: dealForm,
                                required: true,
                                label: "Choose a venue",
                                placeholder: "Venue name",
                                inputProps: "band",
                            }}
                            md={{
                                button: "Add venue",
                                handleOpen: setVenueModalOpened,
                            }}
                        />
                        <Space h="xl" />
                        <SearchOrAdd
                            ac={{
                                data: bandsAutoComplete,
                                useForm: dealForm,
                                required: true,
                                label: "Choose a local promoter",
                                placeholder: "lopro name",
                                inputProps: "band",
                            }}
                            md={{
                                button: "Add local promoter",
                                handleOpen: setBandModalOpened,
                            }}
                        />
                        <Space h="xl" />
                        <SearchOrAdd
                            ac={{
                                data: bandsAutoComplete,
                                useForm: dealForm,
                                required: true,
                                label: "Choose a hotel",
                                placeholder: "Hotel name",
                                inputProps: "band",
                            }}
                            md={{
                                button: "Add hotel",
                                handleOpen: setBandModalOpened,
                            }}
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
                <BandForm
                    handleBands={handleBands}
                    close={closeModals}
                    session={session}
                />
            </Modal>
            <Modal
                opened={venueModalOpened}
                onClose={() => setVenueModalOpened(false)}
                title="Add a new Venue"
                size="xl"
                overflow="inside"
                centered
            >
                <VenueForm
                    handleVenue={handleVenues}
                    close={closeModals}
                    session={session}
                />
            </Modal>
        </>
    );
}

export function DealEditForm({
    handleMemos,
    session,
    data,
    bandName,
    created,
}: DealEditFormProps) {
    const Form = useForm<DealEditFormValues>({
        initialValues: {
            deal: data.deal,
            date: data.date,
            fee: data.fee,
            ticketPriceVVK: data.ticketPriceVVK,
            ticketPriceAK: data.ticketPriceAK,
            posters: data.posters,
            status: data.status,
            notes: data.notes,
        },
    });

    const onDealSubmit = (values: DealEditFormValues) => {
        const memoData = {
            deal: values.deal,
            date: values.date,
            fee: values.fee,
            posters: values.posters,
            notes: values.notes,
            dm: {
                edited: dayjs().toISOString(),
                userid: session.userid,
                created: created,
            },
        };

        handleMemos(memoData);
    };

    return (
        <form onSubmit={Form.onSubmit((values) => onDealSubmit(values))}>
            <Title order={2}>Bandname: {bandName}</Title>
            <Space h="xl" />
            <Textarea
                label="Deal"
                placeholder="Deal information"
                {...Form.getInputProps("deal")}
                autosize
                minRows={3}
                required
            />
            <Space h="xl" />
            <DatePicker
                id="mantine-2wgfg6a6v"
                label="Date"
                defaultValue={dayjs().toDate()}
                {...Form.getInputProps("date")}
                required
            />
            <Space h="xl" />
            <NumberInput
                label="Fee"
                icon="€"
                {...Form.getInputProps("fee")}
                min={0}
                stepHoldDelay={500}
                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                required
            />
            <Space h="xl" />
            <Group grow>
                <NumberInput
                    label="Ticked VVK Price"
                    icon="€"
                    {...Form.getInputProps("ticketPriceVVK")}
                    min={0}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    required
                />
                <NumberInput
                    label="Ticket AK Price"
                    icon="€"
                    {...Form.getInputProps("ticketPriceAK")}
                    min={0}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    required
                />
            </Group>
            <Space h="xl" />
            <NumberInput
                label="Posters"
                {...Form.getInputProps("posters")}
                min={0}
                stepHoldDelay={500}
                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                required
            />
            <Space h="xl" />
            <Select
                label="Status"
                {...Form.getInputProps("status")}
                data={[
                    {
                        value: "pending",
                        label: "Pending",
                    },
                    {
                        value: "accepted",
                        label: "Accepted",
                    },
                    {
                        value: "rejected",
                        label: "Rejected",
                    },
                ]}
                required
            />
            <Space h="xl" />
            <Textarea
                label="Notes"
                {...Form.getInputProps("notes")}
                autosize
                minRows={3}
            />
            <Space h="xl" />
            <Button type="submit" fullWidth mt="xl">
                Submit data
            </Button>
        </form>
    );
}
