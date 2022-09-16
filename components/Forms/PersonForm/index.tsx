import {
    Box,
    Button,
    Divider,
    Group,
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

export function PersonForm({ handleData, close, session, data }: PersonFormProps) {
    const Form = useForm<Person>({
        initialValues: {
            firstName: data?.firstName ?? "",
            lastName: data?.lastName ?? "",
            birthday: data?.birthday ?? "",
            role: data?.role ?? "",
            notes: data?.notes ?? "",
            contact: data?.contact ?? {
                email: "",
                phone: "",
                mobilePhone: "",
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
        v.birthday =
            v.birthday != undefined && v.birthday != ""
                ? dayjs(v.birthday).toISOString()
                : v.birthday;

        const created = data?.dm.created ?? "";

        const vals = getFormValueObject<Person>(v, session.userid, created, {
            createId: "personid",
            value: data?.personid,
        }) as IPerson;

        handleData(vals);

        if(close) close();

        Form.reset();
    };

    // add a "save" button and deliver a save function?
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

                        <Group grow align="flex-end">
                            <DatePicker
                                id="mantine-2wgfg6a6v"
                                label="Birthday"
                                placeholder="Select a date"
                                allowFreeInput
                                clearable={false}
                                inputFormat="DD.MM.YYYY"
                                {...Form.getInputProps("birthday")}
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

                        <ContactInput Form={Form} />

                        <Divider
                            label="Address"
                            my="xl"
                            labelPosition="center"
                        />

                        <AddressInput Form={Form} />
                    </Box>
                </Group>
                <Button type="submit" fullWidth mt="xl">
                    Save Person
                </Button>
            </form>
            {prompt}
        </>
    );
}
