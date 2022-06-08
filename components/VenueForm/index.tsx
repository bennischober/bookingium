import { Button, NumberInput, Space, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
    VenueFormValues,
    VenueFormProps,
    VenueEditFormProps,
} from "../../types";
import { CompanyInput } from "../CompanyInput";

const VenueFormSchema = z.object({
    venue: z
        .string()
        .min(3, { message: "Venue name must be at least 3 characters" }),
    capacity: z.number().min(1, { message: "Capacity must be at least 1" }),
});

export function VenueForm({ handleVenue, close, session }: VenueFormProps) {
    const Form = useForm<VenueFormValues>({
        schema: zodResolver(VenueFormSchema),
        initialValues: {
            venue: "",
            capacity: 0,
            notes: "",
            companyName: "",
            vatNumber: "",
            ustNumber: "",
            street: "",
            streetNumber: 0,
            addressSuffix: "",
            zipCode: 0,
            city: "",
            state: "",
            country: "",
            countryCode: "",
            email: "",
            phone: "",
            mobilePhone: "",
            homepage: "",
        },
    });

    const handleSubmit = (values: VenueFormValues) => {
        const venueData = {
            _id: new mongoose.Types.ObjectId(),
            venueid: uuidv4(),
            venue: values.venue,
            capacity: values.capacity,
            notes: values.notes,
            company: {
                name: values.companyName,
                vatNumber: values.vatNumber,
                ustNumber: values.ustNumber,
                address: {
                    streetNumber: values.streetNumber,
                    street: values.street,
                    addressSuffix: values.addressSuffix,
                    zipCode: values.zipCode,
                    city: values.city,
                    state: values.state,
                    country: values.country,
                    countryCode: values.countryCode,
                },
                contact: {
                    email: values.email,
                    phone: values.phone,
                    mobilePhone: values.mobilePhone,
                    homepage: values.homepage,
                },
            },
            dm: {
                userid: session.userid,
                created: dayjs().toISOString(),
                edited: dayjs().toISOString(),
            },
        };

        handleVenue(venueData);

        if (close) close();
    };

    return (
        <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
                label="Venue"
                {...Form.getInputProps("venue")}
                required
            />
            <NumberInput
                label="Capacity"
                {...Form.getInputProps("capacity")}
                required
            />
            <TextInput label="Notes" {...Form.getInputProps("notes")} />
            <Space h="xl" />
            <CompanyInput Form={Form} />
            <Button type="submit" fullWidth mt="xl">
                Add Venue
            </Button>
        </form>
    );
}

export function VenueEditForm({
    handleVenue,
    session,
    data,
}: VenueEditFormProps) {
    const Form = useForm<VenueFormValues>({
        schema: zodResolver(VenueFormSchema),
        initialValues: {
            venue: data.venue,
            capacity: data.capacity,
            notes: data.notes,
            companyName: data.companyName,
            vatNumber: data.vatNumber,
            ustNumber: data.ustNumber,
            street: data.street,
            streetNumber: data.streetNumber,
            addressSuffix: data.addressSuffix,
            zipCode: data.zipCode,
            city: data.city,
            state: data.state,
            country: data.country,
            countryCode: data.countryCode,
            email: data.email,
            phone: data.phone,
            mobilePhone: data.mobilePhone,
            homepage: data.homepage,
        },
    });

    const handleSubmit = (values: VenueFormValues) => {
        console.log(values);
    };

    return (
        <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
                label="Venue"
                {...Form.getInputProps("venue")}
                required
            />
            <NumberInput
                label="Capacity"
                {...Form.getInputProps("capacity")}
                required
            />
            <TextInput label="Notes" {...Form.getInputProps("notes")} />
            <Space h="xl" />
            <CompanyInput Form={Form} />
            <Button type="submit" fullWidth mt="xl">
                Update Venue Data
            </Button>
        </form>
    );
}
