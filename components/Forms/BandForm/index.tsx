import z from "zod";
import {
    Accordion,
    Box,
    Button,
    Group,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { MdOutlineAdd } from "react-icons/md";
import {
    BandEditFormProps,
    BandFormProps,
    BandFormValues,
} from "../../../types";
import AddressInput from "../../FormInputs/AddressInput";
import ContactInput from "../../FormInputs/ContactInput";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { BandMemberInput } from "../../FormInputs/BandMemberInput";
import { useUnsavedWarn } from "../../../hooks";

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
    const bandForm = useForm({
        validate: zodResolver(schema),
        initialValues: {
            bandName: "",
            notes: "",
            companyName: "",
            vatNumber: "",
            ustNumber: "",
            streetNumber: "",
            street: "",
            addressSuffix: "",
            zipCode: "",
            city: "",
            state: "",
            country: "",
            countryCode: "",
            email: "",
            phone: "",
            mobilePhone: "",
            homepage: "",
            members: [{ name: "", role: "", email: "", phone: "" }],
        },
    });

    const members = bandForm.values.members.map((_, index) => (
        <Box key={index}>
            <BandMemberInput Form={bandForm} index={index} />
            <Space h="xl" />
        </Box>
    ));

    const handleSubmit = async (values: BandFormValues) => {
        const bandData = {
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

        if (handleBands) handleBands(bandData);

        if (close) close();

        bandForm.reset();
    };

    const [prompt] = useUnsavedWarn(bandForm);

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
                <Space h="xl" />
                <Group grow>
                    <TextInput
                        label="VAT Number"
                        {...bandForm.getInputProps("vatNumber")}
                    />
                    <TextInput
                        label="UST Number"
                        {...bandForm.getInputProps("ustNumber")}
                    />
                </Group>
                <Space h="xl" />
                <Accordion>
                    <Accordion.Item value="company-address">
                        <Accordion.Control>Company Address</Accordion.Control>
                        <Accordion.Panel>
                            <AddressInput Form={bandForm} />
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="company-contact">
                        <Accordion.Control>Company Contact</Accordion.Control>
                        <Accordion.Panel>
                            <ContactInput Form={bandForm} />
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="band-members">
                        <Accordion.Control>Band Members</Accordion.Control>
                        <Accordion.Panel>
                            <>
                                {members}
                                <Space h="xl" />
                                <Button
                                    variant="default"
                                    leftIcon={<MdOutlineAdd />}
                                    onClick={() =>
                                        bandForm.insertListItem("members", {
                                            name: "",
                                            role: "",
                                            email: "",
                                            phone: "",
                                        })
                                    }
                                >
                                    Add band member
                                </Button>
                            </>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Button type="submit" fullWidth mt="xl">
                    Add Band
                </Button>
            </form>
            {prompt}
        </>
    );
}

export function BandEditForm({ handleBand, session, data }: BandEditFormProps) {
    // apparently this is not allowed in react => conditional hook execution
    if (!data || !data.members) return <></>;

    const bandForm = useForm({
        validate: zodResolver(schema),
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
            members: data.members,
        },
    });

    const members = bandForm.values.members.map((_, index) => (
        <Box key={index}>
            <BandMemberInput Form={bandForm} index={index} />
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

    const [prompt] = useUnsavedWarn(bandForm);

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
                <Space h="xl" />
                <Group grow>
                    <TextInput
                        label="VAT Number"
                        {...bandForm.getInputProps("vatNumber")}
                    />
                    <TextInput
                        label="UST Number"
                        {...bandForm.getInputProps("ustNumber")}
                    />
                </Group>
                <Space h="xl" />
                <Accordion>
                    <Accordion.Item value="company-address">
                        <Accordion.Control>Company Address</Accordion.Control>
                        <Accordion.Panel>
                            <AddressInput Form={bandForm} />
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="company-contact">
                        <Accordion.Control>Company Contact</Accordion.Control>
                        <Accordion.Panel>
                            <ContactInput Form={bandForm} />
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="band-members">
                        <Accordion.Control>Band Members</Accordion.Control>
                        <Accordion.Panel>
                            <>
                                {members}
                                <Space h="xl" />
                                <Button
                                    variant="default"
                                    leftIcon={<MdOutlineAdd />}
                                    onClick={() =>
                                        bandForm.insertListItem("members", {
                                            name: "",
                                            role: "",
                                            email: "",
                                            phone: "",
                                        })
                                    }
                                >
                                    Add band member
                                </Button>
                            </>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Button type="submit" fullWidth mt="xl">
                    Update Band Data
                </Button>
            </form>
            {prompt}
        </>
    );
}
