import z from "zod";
import {
    Accordion,
    Box,
    Button,
    Space,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { formList, useForm, zodResolver } from "@mantine/form";
import { MdOutlineAdd } from "react-icons/md";
import { BandEditFormProps, BandFormProps, BandFormValues } from "../../types";
import AddressInput from "../AddressInput";
import ContactInput from "../ContactInput";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const schema = z.object({
    bandName: z
        .string()
        .min(3, { message: "Band name must be at least 3 characters" }),
    companyName: z
        .string()
        .min(3, { message: "Company name must be at least 3 characters" }),
    email: z.string().email().or(z.literal("")), // so empty or an email!
    homepage: z.string().url().or(z.literal("")),
});

export function BandForm({ handleBands, close, session }: BandFormProps) {
    const bandForm = useForm<BandFormValues>({
        schema: zodResolver(schema),
        initialValues: {
            bandName: "",
            notes: "",
            companyName: "",
            vatNumber: "",
            ustNumber: "",
            streetNumber: 0,
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
            members: formList([{ name: "", role: "", email: "", phone: "" }]),
        },
    });

    const members = bandForm.values.members.map((_, index) => (
        <Box key={index}>
            <Text>Member {index + 1}</Text>
            <TextInput
                label="Name"
                // so this throws an typescript error, might need to fix this
                {...bandForm.getListInputProps("members", index, "name")}
            />
            <TextInput
                label="Role"
                {...bandForm.getListInputProps("members", index, "role")}
            />
            <TextInput
                label="Email"
                {...bandForm.getListInputProps("members", index, "email")}
            />
            <TextInput
                label="Phone"
                {...bandForm.getListInputProps("members", index, "phone")}
            />
            <Space h="xl" />
        </Box>
    ));

    const handleSubmit = async (values: BandFormValues) => {
        const bandData = {
            _id: new mongoose.Types.ObjectId(),
            bandid: uuidv4(),
            name: values.bandName,
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
            members: values.members,
            dm: {
                userid: session.userid,
                created: dayjs().toISOString(),
                edited: dayjs().toISOString(),
            },
        };

        if(handleBands) handleBands(bandData);

        if (close) close();

        bandForm.reset();
    };

    return (
        <>
            <form
                onSubmit={bandForm.onSubmit((values) => handleSubmit(values))}
            >
                <TextInput
                    label="Band Name"
                    {...bandForm.getInputProps("bandName")}
                    required
                />
                <Textarea label="Notes" {...bandForm.getInputProps("notes")} />
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
                <Accordion>
                    <Accordion.Item label="Company Address">
                        <AddressInput Form={bandForm} />
                    </Accordion.Item>
                    <Accordion.Item label="Company Contact">
                        <ContactInput Form={bandForm} />
                    </Accordion.Item>
                    <Accordion.Item label="Band Members">
                        {members}
                        <Space h="xl" />
                        <Button
                            leftIcon={<MdOutlineAdd />}
                            onClick={() =>
                                bandForm.addListItem("members", {
                                    name: "",
                                    role: "",
                                    email: "",
                                    phone: "",
                                })
                            }
                        >
                            Add band member
                        </Button>
                    </Accordion.Item>
                </Accordion>
                <Button type="submit" fullWidth mt="xl">
                    Add Band
                </Button>
            </form>
        </>
    );
}

export function BandEditForm({handleBand, session, data}: BandEditFormProps) {
    const bandForm = useForm<BandFormValues>({
        schema: zodResolver(schema),
        initialValues: {
            bandName: data.bandName,
            notes: data.notes,
            companyName: data.companyName,
            vatNumber: data.vatNumber,
            ustNumber: data.ustNumber,
            streetNumber: data.streetNumber,
            street: data.street,
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
            members: formList(data.members),
        },
    });

    const members = bandForm.values.members.map((_, index) => (
        <Box key={index}>
            <Text>Member {index + 1}</Text>
            <TextInput
                label="Name"
                // so this throws an typescript error, might need to fix this
                {...bandForm.getListInputProps("members", index, "name")}
            />
            <TextInput
                label="Role"
                {...bandForm.getListInputProps("members", index, "role")}
            />
            <TextInput
                label="Email"
                {...bandForm.getListInputProps("members", index, "email")}
            />
            <TextInput
                label="Phone"
                {...bandForm.getListInputProps("members", index, "phone")}
            />
            <Space h="xl" />
        </Box>
    ));

    const handleSubmit = (values: BandFormValues) => {
        const bandData = {
            //bandid: uuidv4(),
            name: values.bandName,
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
            members: values.members,
            dm: {
                userid: session.userid,
                edited: dayjs().toISOString(),
            },
        };

        handleBand(bandData);
    };

    return (
        <>
            <form
                onSubmit={bandForm.onSubmit((values) => handleSubmit(values))}
            >
                <TextInput
                    label="Band Name"
                    {...bandForm.getInputProps("bandName")}
                    required
                />
                <Textarea label="Notes" {...bandForm.getInputProps("notes")} />
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
                <Accordion>
                    <Accordion.Item label="Company Address">
                        <AddressInput Form={bandForm} />
                    </Accordion.Item>
                    <Accordion.Item label="Company Contact">
                        <ContactInput Form={bandForm} />
                    </Accordion.Item>
                    <Accordion.Item label="Band Members">
                        {members}
                        <Space h="xl" />
                        <Button
                            leftIcon={<MdOutlineAdd />}
                            onClick={() =>
                                bandForm.addListItem("members", {
                                    name: "",
                                    role: "",
                                    email: "",
                                    phone: "",
                                })
                            }
                        >
                            Add band member
                        </Button>
                    </Accordion.Item>
                </Accordion>
                <Button type="submit" fullWidth mt="xl">
                    Update Band Data
                </Button>
            </form>
        </>
    );
}
