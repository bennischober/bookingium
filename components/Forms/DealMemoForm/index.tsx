import { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import {
    Box,
    Button,
    Center,
    Divider,
    Group,
    Modal,
    Paper,
    Space,
} from "@mantine/core";
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
import { HotelForm } from "../HotelForm";
import { IVenue } from "../../../models/venue";
import { IHotel } from "../../../models/hotel";
import { getFormValueObject, getValueAtKey } from "../../../utils/appHandles";
import { DealInput } from "../../FormInputs/DealInput";
import { useUnsavedWarn } from "../../../hooks";
import { DealMemo } from "../../../models/deal-memo";
import { Types } from "mongoose";

export function DealMemoForm({
    bands,
    venues,
    hotels,
    session,
    handleMemos,
    handleBands,
    handleVenues,
    handleHotels,
}: DealMemoFormProps) {
    const [bandModalOpened, setBandModalOpened] = useState(false);
    const [venueModalOpened, setVenueModalOpened] = useState(false);
    const [hotelModalOpened, setHotelModalOpened] = useState(false);

    const dealForm = useForm<DealMemo>({
        initialValues: {
            deal: "",
            date: "",
            fee: 0,
            ticketPriceVVK: 0,
            ticketPriceAK: 0,
            posters: 0,
            status: "pending",
            notes: "",
            lopro: {
                person: "" as unknown as Types.ObjectId,
                company: "" as unknown as Types.ObjectId,
            },
            bandid: "" as unknown as Types.ObjectId,
            venueid: "" as unknown as Types.ObjectId,
            hotelid: "" as unknown as Types.ObjectId,
        },
    });

    const onDealSubmit = async (values: DealMemo) => {
        let band = {} as IBand;
        bands.forEach((val) => {
            if (val._id === values.bandid) {
                band = val;
            }
        });

        if (!band) {
            console.log("band not found, aborting save action!");
            return;
        }

        let venue = {} as IVenue;
        venues?.forEach((val) => {
            if (val._id === values.venueid) {
                venue = val;
            }
        });

        if (!venue) {
            console.log("venue not found, aborting save action!");
            return;
        }

        let hotel = hotels
            ? getValueAtKey(hotels, "_id", values.hotelid)
            : ({} as IHotel);

        const memoData = {
            dealId: uuidv4(),
            deal: values.deal,
            bandid: band._id,
            venueid: venue._id,
            lorpo: {
                person: "",
                company: "",
            },
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
              return val.name;
          })
        : [];

    const hotelsAutoComplete = hotels
        ? hotels?.map((val) => {
              return val.name;
          })
        : [];

    const [prompt] = useUnsavedWarn(dealForm);

    return (
        <>
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
                centered
            >
                <BandForm
                    handleData={handleBands}
                    close={closeModals}
                    session={session}
                />
            </Modal>
            <Modal
                opened={venueModalOpened}
                onClose={() => setVenueModalOpened(false)}
                title="Add a new Venue"
                size="xl"
                centered
            >
                <VenueForm
                    handleData={handleVenues}
                    close={closeModals}
                    session={session}
                />
            </Modal>
            <Modal
                opened={hotelModalOpened}
                onClose={() => setHotelModalOpened(false)}
                title="Add a new Hotel"
                size="xl"
                centered
            >
                <HotelForm
                    handleData={handleHotels}
                    close={closeModals}
                    session={session}
                />
            </Modal>
            {prompt}
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
            date: dayjs(data.date).toDate() as unknown as string,
            fee: data.fee,
            ticketPriceVVK: data.ticketPriceVVK,
            ticketPriceAK: data.ticketPriceAK,
            posters: data.posters,
            status: data.status,
            notes: data.notes,
        },
    });

    const onDealSubmit = (values: DealEditFormValues) => {
        Form.resetDirty();
        const memoData = getFormValueObject<DealEditFormValues>(
            values,
            session.userid,
            created
        );
        handleMemos(memoData);
    };

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => onDealSubmit(values))}>
                <DealInput Form={Form} />
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    Update Deal Data
                </Button>
            </form>
            {prompt}
        </>
    );
}
