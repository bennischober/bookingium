import { useForm } from "@mantine/form";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { FormContainer } from "../../components/Layout/FormContainer";
import { PageTemplate } from "../../components/Layout/PageTemplate";
import { IItinerary, Itinerary } from "../../models/itinerary";
import { Types } from "mongoose";
import {
    Button,
    Group,
    Modal,
    Space,
    TextInput,
    Textarea,
} from "@mantine/core";
import { SearchOrAdd } from "../../components/FormElements/SearchOrAdd";
import { IVenue, Venue } from "../../models/venue";
import { Hotel, IHotel } from "../../models/hotel";
import { ItineraryPageProps, SearchableIdProxyData } from "../../types";
import { useState } from "react";
import { HotelForm } from "../../components/Forms/HotelForm";
import { VenueForm } from "../../components/Forms/VenueForm";
import { DealMemoForm } from "../../components/Forms/DealMemoForm";
import { DealMemo, IDealMemo } from "../../models/deal-memo";
import { Band, IBand } from "../../models/band";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { getFormValueObject, serverSideFetch } from "../../utils/appHandles";
import { ICompany } from "../../models/company";
import { IPerson } from "../../models/person";
import { callAPI, withNotification } from "../../utils/apiHandler";

export default function ItineraryPage({
    session,
    venues,
    hotels,
    dealMemos,
    persons,
    companies,
    bands,
}: ItineraryPageProps) {
    const [venueModalOpen, setVenueModalOpen] = useState(false);
    const [hotelsModalOpen, setHotelsModalOpen] = useState(false);
    const [dealMemoModalOpen, setDealMemoModalOpen] = useState(false);

    const Form = useForm<Itinerary>({
        initialValues: {
            notes: "",
            venueId: "" as unknown as Types.ObjectId,
            hotelId: "" as unknown as Types.ObjectId,
            dealMemoId: "" as unknown as Types.ObjectId,
            getIn: "",
            loadIn: "",
            soundcheckMainAct: "",
            soundcheckSupport: "",
            dinner: "",
            doors: "",
            showtimeMainAct: "",
            showtimeSupport: "",
            curfewStage: "",
            curfewVenue: "",
            showLength: "",
        },
    });

    const onSubmit = async (data: Itinerary) => {
        const itinerary = getFormValueObject<Itinerary>(
            data,
            session.userid
        ) as IItinerary;

        await withNotification(
            () =>
                callAPI<IItinerary>(
                    "/itinerary/",
                    "POST",
                    { data: itinerary },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    const handleVenues = async (data: Venue) => {
        const venue = getFormValueObject<Venue>(data, session.userid) as IVenue;

        await withNotification(
            () =>
                callAPI<IVenue>(
                    "/venue/",
                    "POST",
                    { data: venue },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    const handleHotels = async (data: Hotel) => {
        const hotel = getFormValueObject<Hotel>(data, session.userid) as IHotel;

        await withNotification(
            () =>
                callAPI<IHotel>(
                    "/hotel/",
                    "POST",
                    { data: hotel },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    const handleMemos = async (data: DealMemo) => {
        const memo = getFormValueObject<DealMemo>(
            data,
            session.userid
        ) as IDealMemo;

        await withNotification(
            () =>
                callAPI<IDealMemo>(
                    "/deal-memo/",
                    "POST",
                    { data: memo },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    const handleBands = async (data: Band) => {
        const band = getFormValueObject<Band>(data, session.userid) as IBand;

        await withNotification(
            () =>
                callAPI<IBand>(
                    "/band/",
                    "POST",
                    { data: band },
                    { userid: session.userid }
                ),
            undefined,
            "POST"
        );
    };

    const closeModals = () => {
        setVenueModalOpen(false);
        setHotelsModalOpen(false);
        setDealMemoModalOpen(false);
    };

    const venueAutocomplete: SearchableIdProxyData[] =
        venues?.map((b) => ({
            display: b.name,
            value: b._id,
        })) || [];

    const hotelsAutoComplete: SearchableIdProxyData[] =
        hotels?.map((h) => ({
            display: h.name,
            value: h._id,
        })) || [];

    const dealMemoAutocomplete: SearchableIdProxyData[] =
        dealMemos?.map((b) => ({
            display: b._id,
            value: b._id,
        })) || [];

    const companiesAutoComplete: SearchableIdProxyData[] =
        companies?.map((c) => ({
            display: c.name,
            value: c._id,
        })) || [];

    return (
        <>
            <PageTemplate title="Create a new Itinerary">
                <ContentContainer>
                    <FormContainer>
                        <form
                            onSubmit={Form.onSubmit((values) =>
                                onSubmit(values)
                            )}
                        >
                            <Group grow>
                                <TextInput
                                    label="Get in"
                                    placeholder="ca. 17 Uhr"
                                    {...Form.getInputProps("getIn")}
                                    required
                                />
                                <TextInput
                                    label="Load in"
                                    placeholder="ca. 18 Uhr"
                                    {...Form.getInputProps("loadIn")}
                                    required
                                />
                            </Group>
                            <Space h="xl" />
                            <Group grow>
                                <TextInput
                                    label="Soundcheck Main Act"
                                    placeholder="ca. 19 Uhr"
                                    {...Form.getInputProps("soundcheckMainAct")}
                                    required
                                />
                                <TextInput
                                    label="Showtime Main Act"
                                    placeholder="ca. 23 Uhr"
                                    {...Form.getInputProps("showtimeMainAct")}
                                    required
                                />
                            </Group>
                            <Space h="xl" />
                            <Group grow>
                                <TextInput
                                    label="Dinner"
                                    placeholder="ca. 21 Uhr"
                                    {...Form.getInputProps("dinner")}
                                    required
                                />
                                <TextInput
                                    label="Doors"
                                    placeholder="ca. 22 Uhr"
                                    {...Form.getInputProps("doors")}
                                    required
                                />
                            </Group>
                            <Space h="xl" />
                            <Group grow>
                                <TextInput
                                    label="Curfew Stage"
                                    placeholder="ca. 1 Uhr"
                                    {...Form.getInputProps("curfewStage")}
                                    required
                                />
                                <TextInput
                                    label="Curfew Venue"
                                    placeholder="ca. 2 Uhr"
                                    {...Form.getInputProps("curfewVenue")}
                                    required
                                />
                            </Group>
                            <Space h="xl" />
                            <TextInput
                                label="Show length"
                                placeholder="ca. 90 min"
                                {...Form.getInputProps("showLength")}
                                required
                            />
                            <Space h="xl" />
                            <Group grow>
                                <TextInput
                                    label="Soundcheck Support"
                                    placeholder="ca. 20 Uhr"
                                    {...Form.getInputProps("soundcheckSupport")}
                                />
                                <TextInput
                                    label="Showtime Support"
                                    placeholder="ca. 24 Uhr"
                                    {...Form.getInputProps("showtimeSupport")}
                                />
                            </Group>
                            <Space h="xl" />
                            <SearchOrAdd
                                data={venueAutocomplete}
                                Form={Form}
                                required={true}
                                label={"Choose a venue"}
                                placeholder={"Venue name"}
                                inputProps={"venueId"}
                                buttonLabel={"Add new venue"}
                                handleOpen={setVenueModalOpen}
                            />
                            <Space h="xl" />
                            <SearchOrAdd
                                data={hotelsAutoComplete}
                                Form={Form}
                                required={true}
                                label={"Choose a hotel"}
                                placeholder={"Hotel name"}
                                inputProps={"hotelId"}
                                buttonLabel={"Add new hotel"}
                                handleOpen={setHotelsModalOpen}
                            />
                            <Space h="xl" />
                            <SearchOrAdd
                                data={dealMemoAutocomplete}
                                Form={Form}
                                required={true}
                                label={"Choose a deal memo"}
                                placeholder={"Deal memo id"}
                                inputProps={"dealMemoId"}
                                buttonLabel={"Add new deal memo"}
                                handleOpen={setDealMemoModalOpen}
                            />
                            <Space h="xl" />
                            <Textarea
                                label="Notes"
                                placeholder="Additional notes"
                                {...Form.getInputProps("notes")}
                                autosize
                                minRows={3}
                            />
                            <Space h="xl" />
                            <Button type="submit" fullWidth mt="xl">
                                Add Itinerary
                            </Button>
                        </form>
                    </FormContainer>
                </ContentContainer>
            </PageTemplate>
            <Modal
                opened={venueModalOpen}
                onClose={() => setVenueModalOpen(false)}
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
                opened={hotelsModalOpen}
                onClose={() => setHotelsModalOpen(false)}
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
            <Modal
                opened={dealMemoModalOpen}
                onClose={() => setDealMemoModalOpen(false)}
                title="Add a new Deal Memo"
                size="xl"
                centered
            >
                <DealMemoForm
                    session={session}
                    bands={bands}
                    handleMemos={handleMemos}
                    handleBands={handleBands}
                    handleVenues={handleVenues}
                    handleHotels={handleHotels}
                />
            </Modal>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
    const id = ctx.query.id;

    const memos = await serverSideFetch<IDealMemo>(`/api/deal-memo/`, {
        userid: session?.userid,
    });

    const venues = await serverSideFetch<IVenue>(`/api/venue/`, {
        userid: session?.userid,
    });

    const hotels = await serverSideFetch<IHotel>(`/api/hotel/`, {
        userid: session?.userid,
    });

    const persons = await serverSideFetch<IPerson>(`/api/person/`, {
        userid: session?.userid,
    });

    const companies = await serverSideFetch<ICompany>(`/api/company/`, {
        userid: session?.userid,
    });

    const bands = await serverSideFetch<IBand>(`/api/band/`, {
        userid: session?.userid,
    });

    return {
        props: {
            session: session,
            venues: venues,
            hotels: hotels,
            dealMemos: memos,
            persons: persons,
            companies: companies,
            bands: bands,
        },
    };
};
