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
import {
    DealEditFormProps,
    DealMemoFormProps,
    SearchableIdProxyData,
} from "../../../types";
import { BandForm } from "../BandForm";
import { SearchOrAdd } from "../../FormElements/SearchOrAdd";
import { VenueForm } from "../VenueForm";
import { HotelForm } from "../HotelForm";
import { getFormValueObject, isPopulated } from "../../../utils/appHandles";
import { DealInput } from "../../FormInputs/DealInput";
import { useUnsavedWarn } from "../../../hooks";
import { DealMemo, IDealMemo } from "../../../models/deal-memo";
import { Types } from "mongoose";
import dayjs from "dayjs";
import { IPerson } from "../../../models/person";
import { ICompany } from "../../../models/company";

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
            ticketPriceVVK: 0,
            ticketPriceAK: 0,
            posters: "",
            status: "TBC",
            notes: "",
            lopro: {
                person: "" as unknown as Types.ObjectId,
                company: "" as unknown as Types.ObjectId,
            },
            bandid: "" as unknown as Types.ObjectId,
            venueid: "" as unknown as Types.ObjectId,
            hotelid: null as unknown as Types.ObjectId,
        },
    });

    const [prompt] = useUnsavedWarn(Form);

    const onDealSubmit = async (values: DealMemo) => {
        if (!bands || !venues || !persons || !companies) {
            console.error("No bands, venues, persons or companies found");
            return;
        }

        const memoData = getFormValueObject<DealMemo>(
            values,
            session.userid
        ) as IDealMemo;

        handleMemos(memoData);

        Form.reset();
    };

    const closeModals = () => {
        setBandModalOpened(false);
        setVenueModalOpened(false);
        setHotelModalOpened(false);
    };

    if (!persons || !companies || !bands || !venues) return <></>;

    const bandsAutoComplete: SearchableIdProxyData[] = bands.map((b) => ({
        label: b.name,
        value: b._id,
    }));
    const venuesAutoComplete: SearchableIdProxyData[] = venues.map((v) => ({
        label: v.name,
        value: v._id,
    }));
    const hotelsAutoComplete: SearchableIdProxyData[] =
        hotels?.map((h) => ({
            label: h.name,
            value: h._id,
        })) || [];
    const personsAutoComplete: SearchableIdProxyData[] = persons.map((p) => ({
        label: `${p.firstName} ${p.lastName}`,
        value: p._id,
    }));
    const companiesAutoComplete: SearchableIdProxyData[] = companies.map(
        (c) => ({
            label: c.name,
            value: c._id,
        })
    );

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => onDealSubmit(values))}>
                <Group grow align="top">
                    <Box>
                        <SearchOrAdd
                            data={bandsAutoComplete}
                            Form={Form}
                            required={true}
                            label={"Choose a band"}
                            placeholder={"Band name"}
                            inputProps={"bandid"}
                            buttonLabel={"Add new band"}
                            handleOpen={setBandModalOpened}
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
                        <Divider my="xl" label="Other" labelPosition="center" />
                        <SearchOrAdd
                            data={venuesAutoComplete}
                            Form={Form}
                            required={true}
                            label={"Choose a venue"}
                            placeholder={"Venue name"}
                            inputProps={"venueid"}
                            buttonLabel={"Add new venue"}
                            handleOpen={setVenueModalOpened}
                        />
                        <Space h="xl" />
                        <SearchOrAdd
                            data={hotelsAutoComplete}
                            Form={Form}
                            label={"Choose a hotel"}
                            placeholder={"Hotel name"}
                            inputProps={"hotelid"}
                            buttonLabel={"Add new hotel"}
                            handleOpen={setHotelModalOpened}
                            required={false}
                        />
                    </Box>
                </Group>
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    Submit data
                </Button>
            </form>
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
                    persons={persons}
                    companies={companies}
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
                    companies={companiesAutoComplete}
                    persons={persons}
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
            ticketPriceVVK: data.ticketPriceVVK,
            ticketPriceAK: data.ticketPriceAK,
            posters: data.posters,
            status: data.status,
            notes: data.notes,
            lopro: {
                person: data.lopro.person,
                company: data.lopro.company,
            },
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
            created
        ) as IDealMemo;

        // clear populated fields => Note: this is not needed!
        memoData.hotelid = memoData.hotelid?._id ?? memoData.hotelid;
        memoData.venueid = memoData.venueid?._id ?? memoData.venueid;
        memoData.bandid = memoData.bandid?._id ?? memoData.bandid;
        memoData.lopro.person =
            memoData.lopro.person?._id ?? memoData.lopro.person;
        memoData.lopro.company =
            memoData.lopro.company?._id ?? memoData.lopro.company;

        handleMemos(memoData);
    };

    const [prompt] = useUnsavedWarn(Form);

    const p = isPopulated<IPerson>(data.lopro.person)
        ? (data.lopro.person as IPerson)
        : null;

    const c = isPopulated<ICompany>(data.lopro.company)
        ? (data.lopro.company as ICompany)
        : null;

    if (!c || !p) return <></>;

    const personData = [
        {
            label: `${p.firstName} ${p.lastName}`,
            value: p._id,
        },
    ];

    const companyData = [
        {
            label: c.name,
            value: c._id,
        },
    ];

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => onDealSubmit(values))}>
                <DealInput
                    Form={Form}
                    person={personData}
                    company={companyData}
                    isEdit={true}
                />
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    Update Deal Data
                </Button>
            </form>
            {prompt}
        </>
    );
}
