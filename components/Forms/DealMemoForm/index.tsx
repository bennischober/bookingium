import { useState } from "react";
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
import { DealEditFormProps, DealMemoFormProps } from "../../../types";
import { BandForm } from "../BandForm";
import { SearchOrAdd } from "../../FormElements/SearchOrAdd";
import { VenueForm } from "../VenueForm";
import { HotelForm } from "../HotelForm";
import {
    getFormValueObject,
    getValueAtCombinedKey,
    getValueAtKey,
    toAutocomplete,
    toCombinedAutocomplete,
} from "../../../utils/appHandles";
import { DealInput } from "../../FormInputs/DealInput";
import { useUnsavedWarn } from "../../../hooks";
import { DealMemo, IDealMemo } from "../../../models/deal-memo";
import { Types } from "mongoose";
import dayjs from "dayjs";

export function DealMemoForm({
    bands,
    venues,
    hotels,
    persons,
    companies,
    session,
    handleMemos,
    handleBands,
    handleVenues,
    handleHotels,
}: DealMemoFormProps) {
    const [bandModalOpened, setBandModalOpened] = useState(false);
    const [venueModalOpened, setVenueModalOpened] = useState(false);
    const [hotelModalOpened, setHotelModalOpened] = useState(false);

    const Form = useForm<DealMemo>({
        initialValues: {
            deal: "",
            date: dayjs().toDate(),
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
        if (!bands || !venues || !hotels || !persons || !companies) {
            console.error("No bands, venues or hotels found");
            return;
        }

        const band = getValueAtKey(bands, "name", values.bandid);
        const venue = getValueAtKey(venues, "name", values.venueid);
        const hotel = getValueAtKey(hotels, "name", values.hotelid);
        const lopro = getValueAtCombinedKey(
            persons,
            ["firstName", "lastName"],
            values.lopro.person
        );
        const company = getValueAtKey(companies, "name", values.lopro.company);

        const memoData = getFormValueObject<DealMemo>(
            values,
            session.userid,
            undefined,
            {
                createId: "dealid",
            }
        ) as IDealMemo;

        memoData.bandid = band._id;
        memoData.venueid = venue._id;
        memoData.hotelid = hotel._id;
        memoData.lopro.person = lopro._id;
        memoData.lopro.company = company._id;

        handleMemos(memoData);

        Form.reset();
    };

    const closeModals = () => {
        setBandModalOpened(false);
        setVenueModalOpened(false);
        setHotelModalOpened(false);
    };

    // useMemo?
    const bandsAutoComplete = toAutocomplete(bands, "name");
    const venuesAutoComplete = toAutocomplete(venues, "name");
    const hotelsAutoComplete = toAutocomplete(hotels, "name");
    const personsAutoComplete = toCombinedAutocomplete(persons, ["firstName", "lastName"], " ");
    const companiesAutoComplete = toAutocomplete(companies, "name");

    const [prompt] = useUnsavedWarn(Form);

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
                        onSubmit={Form.onSubmit((values) =>
                            onDealSubmit(values)
                        )}
                    >
                        <Group grow align="top">
                            <Box>
                                <SearchOrAdd
                                    ac={{
                                        data: bandsAutoComplete,
                                        useForm: Form,
                                        required: true,
                                        label: "Choose a band",
                                        placeholder: "Band name",
                                        inputProps: "bandid",
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
                                <DealInput
                                    Form={Form}
                                    person={personsAutoComplete}
                                    company={companiesAutoComplete}
                                />
                                <Space h="xl" />
                                <Divider
                                    my="xl"
                                    label="Other"
                                    labelPosition="center"
                                />
                                <SearchOrAdd
                                    ac={{
                                        data: venuesAutoComplete,
                                        useForm: Form,
                                        required: true,
                                        label: "Choose a venue",
                                        placeholder: "Venue name",
                                        inputProps: "venueid",
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
                                        useForm: Form,
                                        required: false,
                                        label: "Choose a hotel",
                                        placeholder: "Hotel name",
                                        inputProps: "hotelid",
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
                    persons={personsAutoComplete}
                    companies={companiesAutoComplete}
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
    created,
}: DealEditFormProps) {
    const Form = useForm<DealMemo>({
        initialValues: {
            deal: data.deal,
            date: dayjs(data.date).toDate(),
            fee: data.fee,
            ticketPriceVVK: data.ticketPriceVVK,
            ticketPriceAK: data.ticketPriceAK,
            posters: data.posters,
            status: data.status,
            notes: data.notes,
            lopro: data.lopro,
            bandid: data.bandid,
            venueid: data.venueid,
            hotelid: data.hotelid,
        },
    });

    const onDealSubmit = (values: DealMemo) => {
        Form.resetDirty();
        const memoData = getFormValueObject<DealMemo>(
            values,
            session.userid,
            created,
            {
                createId: "dealid",
                value: data.dealid,
            }
        ) as IDealMemo;
        handleMemos(memoData);
    };

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => onDealSubmit(values))}>
                <DealInput Form={Form} person={[]} company={[]} />
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    Update Deal Data
                </Button>
            </form>
            {prompt}
        </>
    );
}
