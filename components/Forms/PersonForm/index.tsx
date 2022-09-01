import {
    Box,
    Button,
    Divider,
    Group,
    Select,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useUnsavedWarn } from "../../../hooks";
import { IPerson, Person } from "../../../models/person";
import { PersonFormProps } from "../../../types";
import { getFormValueObject } from "../../../utils/appHandles";
import AddressInput from "../../FormInputs/AddressInput";
import ContactInput from "../../FormInputs/ContactInput";

const Tag = [
    { value: "Band", label: "Band member" },
    { value: "Venue", label: "Venue" },
    { value: "Lopro", label: "Local Promoter" },
    { value: "Hotel", label: "Hotel" },
];

export function PersonForm({ handleData, session, data }: PersonFormProps) {
    const Form = useForm<Person>({
        initialValues: {
            firstName: data?.firstName ?? "",
            lastName: data?.lastName ?? "",
            birthday: data?.birthday ?? (dayjs().toDate() as unknown as string),
            tag: data?.tag ?? "Band",
            role: data?.role ?? "",
            notes: data?.notes ?? "",
            contact: data?.contact ?? {
                email: "",
                phone: "",
                mobilePhone: "",
                privatePhone: "",
                otherNumbers: [],
                homepage: "",
            },
            address: data?.address ?? {
                streetNumber: "",
                street: "",
                addressSuffix: "",
                zipCode: "",
                city: "",
                state: "",
                country: "",
                countryCode: "",
            },
        },
    });

    const handleSubmit = (values: Person) => {
        const v = values;
        v.birthday = dayjs(v.birthday).toISOString();

        const created = data?.dm.created ?? "";

        const vals = getFormValueObject<Person>(v, session.userid, created, {
            createId: "personid",
            value: data?.personid,
        }) as IPerson;

        if (handleData) handleData(vals);

        console.log(vals);

        // if not "delivered", handle data on own
    };

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <Group grow align="top">
                    <Box>
                        <Group grow>
                            <TextInput
                                label="First Name"
                                {...Form.getInputProps("firstName")}
                                required
                            />
                            <TextInput
                                label="Last Name"
                                {...Form.getInputProps("lastName")}
                                required
                            />
                        </Group>

                        <Space h="xl" />

                        <DatePicker
                            id="mantine-2wgfg6a6v"
                            label="Birthday"
                            placeholder="Select a date"
                            allowFreeInput
                            clearable={false}
                            inputFormat="DD.MM.YYYY"
                            {...Form.getInputProps("birthday")}
                            required
                        />

                        <Space h="xl" />

                        <Group grow>
                            <Select
                                label="Tag"
                                {...Form.getInputProps("tag")}
                                data={Tag}
                                required
                            />
                            <TextInput
                                label="Role"
                                {...Form.getInputProps("role")}
                            />
                        </Group>

                        <Space h="xl" />

                        <Textarea
                            label="Notes"
                            {...Form.getInputProps("notes")}
                        />

                        <Divider
                            label="Contact"
                            my="xl"
                            labelPosition="center"
                        />

                        <ContactInput Form={Form} isCompany={false} />

                        <Divider
                            label="Address"
                            my="xl"
                            labelPosition="center"
                        />

                        <AddressInput Form={Form} />
                    </Box>
                </Group>
                <Button type="submit" fullWidth mt="xl">
                    Add Person
                </Button>
            </form>
            {prompt}
        </>
    );
}
