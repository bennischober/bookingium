import { Paper, Space, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import mongoose from "mongoose";
import band from "../../pages/api/band";

// ideas:
// 1: use zod for validation of members: https://mantine.dev/form/schema/, https://www.npmjs.com/package/zod
// 2: create another component with seperate form element for members; parent will need to validate all childs (members)
// if 2 works, create specific components for address and contact

export interface BandFormValues {
    bandName: string;
    notes: string;
    companyName: string;
    vatNumber: string;
    ustNumber: string;
    streetNumber: string;
    street: string;
    addressSuffix: string;
    zipCode: number;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    email: string;
    phone: string;
    mobilePhone: string;
    homepage: string;
    members: {
        name: string;
        role: string;
        email: string;
        phone: string;
    }[];
}

export function CreateBandForm() {
    const bandForm = useForm<BandFormValues>({
        initialValues: {
            bandName: "",
            notes: "",
            companyName: "",
            vatNumber: "",
            ustNumber: "",
            streetNumber: "",
            street: "",
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
            members: [],
        },
        validate: (values: BandFormValues) => ({
            bandName:
                values.bandName.length > 0
                    ? undefined
                    : "Band name is required",
            notes: values.notes.length > 0 ? undefined : "Notes is required",
            companyName:
                values.companyName.length > 0
                    ? undefined
                    : "Company name is required",
            vatNumber:
                values.vatNumber.length > 0
                    ? undefined
                    : "Vat number is required",
            ustNumber:
                values.ustNumber.length > 0
                    ? undefined
                    : "Ust number is required",
            streetNumber:
                values.streetNumber.length > 0
                    ? undefined
                    : "Street number is required",
            street: values.street.length > 0 ? undefined : "Street is required",
            addressSuffix:
                values.addressSuffix.length > 0
                    ? undefined
                    : "Address suffix is required",
            zipCode: values.zipCode > 0 ? undefined : "Zip code is required",
            city: values.city.length > 0 ? undefined : "City is required",
            state: values.state.length > 0 ? undefined : "State is required",
            country:
                values.country.length > 0 ? undefined : "Country is required",
            countryCode:
                values.countryCode.length > 0
                    ? undefined
                    : "Country code is required",
            email: values.email.length > 0 ? undefined : "Email is required",
            phone: values.phone.length > 0 ? undefined : "Phone is required",
            mobilePhone:
                values.mobilePhone.length > 0
                    ? undefined
                    : "Mobile phone is required",
            homepage:
                values.homepage.length > 0 ? undefined : "Homepage is required",
            members:
                values.members.length >= 0 ? undefined : "Members is required",
        }),
    });

    return (
        <Paper>
            <form>
                <TextInput
                    label="Band Name"
                    {...bandForm.getInputProps("bandName")}
                    required
                />
                <TextInput label="Notes" {...bandForm.getInputProps("notes")} />
                <Space h="xl" />
                <TextInput
                    label="Company Name"
                    {...bandForm.getInputProps("companyName")}
                    required
                />
                <TextInput
                    label="VAT Number"
                    {...bandForm.getInputProps("vatNumber")}
                />
                <TextInput
                    label="UST Number"
                    {...bandForm.getInputProps("ustNumber")}
                />
                <Space h="xl" />
                <TextInput
                    label="Street"
                    {...bandForm.getInputProps("street")}
                />
                <TextInput
                    label="Street number"
                    {...bandForm.getInputProps("streetNumber")}
                />
                <TextInput label="City" {...bandForm.getInputProps("city")} />
                <TextInput label="State" {...bandForm.getInputProps("state")} />
                <TextInput
                    label="Zip code"
                    {...bandForm.getInputProps("zipCode")}
                />
                <TextInput
                    label="Country"
                    {...bandForm.getInputProps("country")}
                />
                <Space h="xl" />
                <TextInput label="Email" name="email" />
                <TextInput label="Phone" name="phone" />
                <TextInput label="Homepage" name="homepage" />
            </form>
        </Paper>
    );
}
