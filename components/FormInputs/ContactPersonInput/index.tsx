import {
    Accordion,
    Box,
    Button,
    Group,
    Space,
    Text,
    TextInput,
} from "@mantine/core";
import { MdOutlineAdd } from "react-icons/md";
import { InputComponentProps } from "../../../types";

// Note: This is no standalone component, this needs to be paired with a functional form component!

// Person: {Form.getListInputProps("contactPerson", index, "name").value !== "" ? Form.getListInputProps("contactPerson", index, "name").value : index + 1}
export default function ContactPersonInput({ Form }: InputComponentProps) {
    if (!Form.values.contactPerson) return <></>;

    const contactPersons = Form.values.contactPerson.map(
        (_: any, index: any) => (
            <Box key={index}>
                <Text>Person: {index + 1}</Text>
                <Group grow>
                    <TextInput
                        label="Name"
                        {...Form.getInputProps(`contactPerson.${index}.name`)}
                    />
                    <TextInput
                        label="Role"
                        {...Form.getInputProps(`contactPerson.${index}.role`)}
                    />
                </Group>
                <Space h="xl" />
                <Group grow>
                    <TextInput
                        label="Email"
                        {...Form.getInputProps(`contactPerson.${index}.email`)}
                    />
                    <TextInput
                        label="Phone"
                        {...Form.getInputProps(`contactPerson.${index}.phone`)}
                    />
                </Group>
                <Space h="xl" />
            </Box>
        )
    );

    return (
        <Accordion>
            <Accordion.Item value="contact-persons">
                <Accordion.Control>Contact Persons</Accordion.Control>
                <Accordion.Panel>
                    <>
                        {contactPersons}
                        <Button
                            variant="default"
                            leftIcon={<MdOutlineAdd />}
                            onClick={() =>
                                Form.addListItem("contactPerson", {
                                    name: "",
                                    role: "",
                                    email: "",
                                    phone: "",
                                })
                            }
                        >
                            Add contact person
                        </Button>
                    </>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
