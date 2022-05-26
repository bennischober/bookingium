import z from 'zod';
import {
    Accordion,
    Box,
    Button,
    Paper,
    Space,
    Text,
    TextInput,
} from "@mantine/core";
import { formList, useForm, zodResolver  } from "@mantine/form";
import { MdOutlineAdd } from "react-icons/md";
import { BandFormValues } from "../../types";
import AddressInput from "../AddressInput";
import ContactInput from "../ContactInput";

const schema = z.object({
    bandName: z.string().min(3, { message: 'Band name must be at least 3 characters' }),
    companyName: z.string().min(3, { message: 'Company name must be at least 3 characters' }),
    email: z.string().email().or(z.literal('')), // so empty or an email!
    homepage: z.string().url().or(z.literal('')),
})

export function BandForm() {
    const bandForm = useForm<BandFormValues>({
        schema: zodResolver(schema),
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
            members: formList([{ name: "", role: "", email: "", phone: "" }]),
        }
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

    return (
        <Paper>
            <form onSubmit={bandForm.onSubmit((values) => console.log(values))}>
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
        </Paper>
    );
}
