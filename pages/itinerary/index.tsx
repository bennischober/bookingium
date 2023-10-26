import { useForm } from "@mantine/form";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { FormContainer } from "../../components/Layout/FormContainer";
import { PageTemplate } from "../../components/Layout/PageTemplate";
import { Itinerary } from "../../models/itinerary";
import { Types } from "mongoose";
import { Button, Modal, Space } from "@mantine/core";
import { SearchOrAdd } from "../../components/FormElements/SearchOrAdd";
import { IVenue } from "../../models/venue";
import { IHotel } from "../../models/hotel";
import { ItineraryPageProps, SearchableIdProxyData } from "../../types";
import { useState } from "react";
import { HotelForm } from "../../components/Forms/HotelForm";
import { VenueForm } from "../../components/Forms/VenueForm";
import { DealMemoForm } from "../../components/Forms/DealMemoForm";
import { IDealMemo } from "../../models/deal-memo";
import { IBand } from "../../models/band";

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

    const onSubmit = (itinierary: Itinerary) => {
        console.log(Form.values);
    };

    const handleVenues = (venue: IVenue) => {
        // TODO: implement
    };

    const handleHotels = (hotel: IHotel) => {
        // TODO: implement
    };

    const handleMemos = (memo: IDealMemo) => {
        // TODO: implement
    };

    const handleBands = (band: IBand) => {
        // TODO: implement
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
