import { Button, NumberInput, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";
import { VenueFormValues, VenueFormProps } from "../../types";
import { CompanyInput } from "../CompanyInput";

export function VenueForm({ handleVenue, close, session }: VenueFormProps) {
    const Form = useForm<VenueFormValues>({
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
