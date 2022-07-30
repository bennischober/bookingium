import { useState } from "react";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
    Box,
    Button,
    Center,
    Container,
    Divider,
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
import { IBand } from "../../../models/band";
import {
    DealEditFormProps,
    DealEditFormValues,
    DealMemoFormProps,
    DealMemoFormValues,
} from "../../../types";
import { BandForm } from "../BandForm";
import { SearchOrAdd } from "../../FormElements/SearchOrAdd";
import { VenueForm } from "../VenueForm";
import { LoproForm } from "../LoproForm";
import { HotelForm } from "../HotelForm";
import { IVenue } from "../../../models/venue";
import { ILopro } from "../../../models/lopro";
import { IHotel } from "../../../models/hotel";
import { getValueAtKey } from "../../../utils/appHandles";
import { DealInput } from "../../FormInputs/DealInput";

export function DealMemoForm({
    bands,
    venues,
    lopros,
    hotels,
    session,
    handleMemos,
    handleBands,
    handleVenues,
    handleLopros,
    handleHotels,
}: DealMemoFormProps) {
    const [bandModalOpened, setBandModalOpened] = useState(false);
    const [venueModalOpened, setVenueModalOpened] = useState(false);
    const [loproModalOpened, setLoproModalOpened] = useState(false);
    const [hotelModalOpened, setHotelModalOpened] = useState(false);

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
            venue: "",
            lopro: "",
            hotel: "",
        },
        validate: (values: DealMemoFormValues) => ({
            band: values.band.length > 0 ? undefined : "Band is required",
            date:
                values.date.toString().length > 0
                    ? undefined
                    : "Date is required",
            deal: values.deal.length > 0 ? undefined : "Deal is required",
            fee: values.fee >= 0 ? undefined : "Price is required",
            ticketPriceVVK:
                values.ticketPriceVVK >= 0 ? undefined : "Price is required",
            ticketPriceAK:
                values.ticketPriceAK >= 0 ? undefined : "Price is required",
            posters: values.posters >= 0 ? undefined : "Posters is required",
            status: values.status.length > 0 ? undefined : "Status is required",
            venue: values.venue.length > 0 ? undefined : "Venue is required",
            lopro: values.lopro.length > 0 ? undefined : "Lopro is required",
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

        let venue = {} as IVenue;
        venues?.forEach((val) => {
            if (val.venue === values.venue) {
                venue = val;
            }
        });

        if (!venue) {
            console.log("venue not found, aborting save action!");
            return;
        }

        let lopro = {} as ILopro;
        lopros?.forEach((val) => {
            if (val.name === values.lopro) {
                lopro = val;
            }
        });
        if (!lopro) {
            console.log("lopro not found, aborting save action!");
            return;
        }

        let hotel = hotels
            ? getValueAtKey(hotels, "name", values.hotel)
            : ({} as IHotel);

        const memoData = {
            _id: new mongoose.Types.ObjectId(),
            dealId: uuidv4(),
            deal: values.deal,
            bandid: band._id,
            venueid: venue._id,
            loproid: lopro._id,
            hotelid: hotel ? hotel._id : null,
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

        dealForm.reset();
    };

    const closeModals = () => {
        setBandModalOpened(false);
        setVenueModalOpened(false);
        setLoproModalOpened(false);
        setHotelModalOpened(false);
    };

    // useMemo?
    const bandsAutoComplete = bands
        ? bands?.map((val) => {
              return val.name;
          })
        : [];

    const venuesAutoComplete = venues
        ? venues?.map((val) => {
              return val.venue;
          })
        : [];

    const loprosAutoComplete = lopros
        ? lopros?.map((val) => {
              return val.name;
          })
        : [];

    const hotelsAutoComplete = hotels
        ? hotels?.map((val) => {
              return val.name;
          })
        : [];

    return (
        <>
            {/* <Title order={1}>Create a new Deal Memo</Title> */}
            <Center>
                <Paper
                    withBorder
                    shadow="md"
                    p={30}
                    mt={30}
                    radius="xs"
                    sx={{ minWidth: 300, maxWidth: 750, width: "100vw" }}
                >
                    <form
                        onSubmit={dealForm.onSubmit((values) =>
                            onDealSubmit(values)
                        )}
                    >
                        <Group grow align="top">
                            <Box>
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
                                        button: "Add new band",
                                        handleOpen: setBandModalOpened,
                                    }}
                                />
                                <Space h="xl" />
                                <Divider
                                    my="xl"
                                    label="Deal data"
                                    labelPosition="center"
                                />
                                <DealInput Form={dealForm} />
                                <Space h="xl" />
                                <Divider
                                    my="xl"
                                    label="Other"
                                    labelPosition="center"
                                />
                                <SearchOrAdd
                                    ac={{
                                        data: venuesAutoComplete,
                                        useForm: dealForm,
                                        required: true,
                                        label: "Choose a venue",
                                        placeholder: "Venue name",
                                        inputProps: "venue",
                                    }}
                                    md={{
                                        button: "Add new venue",
                                        handleOpen: setVenueModalOpened,
                                    }}
                                />
                                <Space h="xl" />
                                <SearchOrAdd
                                    ac={{
                                        data: loprosAutoComplete,
                                        useForm: dealForm,
                                        required: true,
                                        label: "Choose a local promoter",
                                        placeholder: "lopro name",
                                        inputProps: "lopro",
                                    }}
                                    md={{
                                        button: "Add new local promoter",
                                        handleOpen: setLoproModalOpened,
                                    }}
                                />
                                <Space h="xl" />
                                <SearchOrAdd
                                    ac={{
                                        data: hotelsAutoComplete,
                                        useForm: dealForm,
                                        required: false,
                                        label: "Choose a hotel",
                                        placeholder: "Hotel name",
                                        inputProps: "hotel",
                                    }}
                                    md={{
                                        button: "Add new hotel",
                                        handleOpen: setHotelModalOpened,
                                    }}
                                />
                            </Box>
                        </Group>
                        <Space h="xl" />
                        <Button type="submit" fullWidth mt="xl">
                            Submit data
                        </Button>
                    </form>
                </Paper>
            </Center>
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
            <Modal
                opened={loproModalOpened}
                onClose={() => setLoproModalOpened(false)}
                title="Add a new Lopro"
                size="xl"
                overflow="inside"
                centered
            >
                <LoproForm
                    handleLopro={handleLopros}
                    close={closeModals}
                    session={session}
                />
            </Modal>
            <Modal
                opened={hotelModalOpened}
                onClose={() => setHotelModalOpened(false)}
                title="Add a new Hotel"
                size="xl"
                overflow="inside"
                centered
            >
                <HotelForm
                    handleHotel={handleHotels}
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
            <Title order={2}>Band name: {bandName}</Title>
            <Space h="xl" />
            <DealInput Form={Form} />
            <Space h="xl" />
            <Button type="submit" fullWidth mt="xl">
                Update Deal Data
            </Button>
        </form>
    );
}
