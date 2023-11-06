"use client";

import { IHotel } from "@/models/hotel";
import { IItinerary, Itinerary } from "@/models/itinerary";
import { IVenue } from "@/models/venue";
import { SearchableIdProxyData } from "@/types";
import {
    Button,
    Fieldset,
    Group,
    NumberInput,
    Space,
    Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Types } from "mongoose";
import { SearchableIdProxy } from "@/components/FormElements/Searchable";
import { TimePickerInput } from "@/components/Core/Input/TimePickerInput";
import { z } from "zod";

const schema = z.object({
    getIn: z.string().min(5, { message: "Get in is required" }),
    loadIn: z.string().min(5, { message: "Load in is required" }),
    soundCheckMainAct: z
        .string()
        .min(5, { message: "Sound check time for the main act is required" }),
    dinner: z.string().min(5, { message: "A time for dinner is required" }),
    doors: z.string().min(5, { message: "A time for doors is required" }),
    showTimeMainAct: z
        .string()
        .min(5, { message: "The show time for the main act is required" }),
    curfewStage: z
        .string()
        .min(5, { message: "The curfew stage time is required" }),
    curfewVenue: z
        .string()
        .min(5, { message: "The curfew venue time is required" }),
    // should this be computed?
    showLength: z.string().min(1, { message: "Show length is required" }),
});

interface ItineraryFormProps {
    dealId: string;
    handleItinerary: (data: Itinerary) => void;
    venues: IVenue[];
    hotels: IHotel[];
    data?: IItinerary;
}

export function ItineraryForm({
    dealId,
    handleItinerary,
    venues,
    hotels,
    data,
}: ItineraryFormProps) {
    const Form = useForm<Itinerary>({
        initialValues: {
            notes: data?.notes ?? "",
            venueId: data?.venueId ?? ("" as unknown as Types.ObjectId),
            hotelId: data?.hotelId ?? ("" as unknown as Types.ObjectId),
            dealMemoId: dealId as unknown as Types.ObjectId,
            getIn: data?.getIn ?? "",
            loadIn: data?.loadIn ?? "",
            soundCheckMainAct: data?.soundCheckMainAct ?? "",
            soundCheckSupport: data?.soundCheckSupport ?? "",
            dinner: data?.dinner ?? "",
            doors: data?.doors ?? "",
            showTimeMainAct: data?.showTimeMainAct ?? "",
            showTimeSupport: data?.showTimeSupport ?? "",
            curfewStage: data?.curfewStage ?? "",
            curfewVenue: data?.curfewVenue ?? "",
            showLength: data?.showLength ?? "",
        },
        validate: zodResolver(schema),
    });

    const venueAutocomplete: SearchableIdProxyData[] =
        venues?.map((b) => ({
            label: b.name,
            value: b._id,
        })) || [];

    const hotelsAutoComplete: SearchableIdProxyData[] =
        hotels?.map((h) => ({
            label: h.name,
            value: h._id,
        })) || [];

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleItinerary(values))}>
                <Fieldset legend="Band Times">
                    <Fieldset legend="Main Act">
                        <Group grow>
                            <TimePickerInput
                                label="Soundcheck"
                                Form={Form}
                                propsName="soundCheckMainAct"
                                withAsterisk
                            />
                            <TimePickerInput
                                label="Showtime"
                                Form={Form}
                                propsName="showTimeMainAct"
                                withAsterisk
                            />
                        </Group>
                    </Fieldset>
                    <Space h="xl" />
                    <Fieldset legend="Support" variant="filled">
                        <Group grow>
                            <TimePickerInput
                                label="Soundcheck"
                                Form={Form}
                                propsName="soundCheckSupport"
                            />
                            <TimePickerInput
                                label="Showtime"
                                Form={Form}
                                propsName="showTimeSupport"
                            />
                        </Group>
                    </Fieldset>
                    <Space h="xl" />
                    <Group grow>
                        <TimePickerInput
                            label="Get in"
                            Form={Form}
                            propsName="getIn"
                            withAsterisk
                        />
                        <TimePickerInput
                            label="Load in"
                            Form={Form}
                            propsName="loadIn"
                            withAsterisk
                        />
                    </Group>
                    <Space h="xl" />
                    <Group grow>
                        <TimePickerInput
                            label="Dinner"
                            Form={Form}
                            propsName="dinner"
                            withAsterisk
                        />
                        <TimePickerInput
                            label="Doors"
                            Form={Form}
                            propsName="doors"
                            withAsterisk
                        />
                    </Group>
                    <Space h="xl" />
                    <Group grow>
                        <TimePickerInput
                            label="Curfew Stage"
                            Form={Form}
                            propsName="curfewStage"
                            withAsterisk
                        />
                        <TimePickerInput
                            label="Curfew Venue"
                            Form={Form}
                            propsName="curfewVenue"
                            withAsterisk
                        />
                    </Group>
                </Fieldset>
                <Space h="xl" />
                <Fieldset legend="Location">
                    <Group grow>
                        <SearchableIdProxy
                            data={venueAutocomplete}
                            Form={Form}
                            required
                            label={"Choose a venue"}
                            placeholder={"Venue name"}
                            inputProps={"venueId"}
                        />
                        <SearchableIdProxy
                            data={hotelsAutoComplete}
                            Form={Form}
                            required
                            label={"Choose a hotel"}
                            placeholder={"Hotel name"}
                            inputProps={"hotelId"}
                        />
                    </Group>
                </Fieldset>
                <Space h="xl" />
                <NumberInput
                    label="Show length"
                    placeholder="90 min"
                    {...Form.getInputProps("showLength")}
                    suffix=" min"
                    hideControls
                    withAsterisk
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
                    Create Itinerary
                </Button>
            </form>
        </>
    );
}
