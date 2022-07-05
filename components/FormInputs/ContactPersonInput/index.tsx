import { Accordion, Box, Button, Space, Text, TextInput } from "@mantine/core";
import { MdOutlineAdd } from "react-icons/md";
import { InputComponentProps } from "../../../types";

// Note: This is no standalone component, this needs to be paired with a functional form component!

// Person: {Form.getListInputProps("contactPerson", index, "name").value !== "" ? Form.getListInputProps("contactPerson", index, "name").value : index + 1}
export default function ContactPersonInput({ Form }: InputComponentProps<any>) {
    const contactPersons = Form.values.contactPerson.map(
        (_: any, index: any) => (
            <Box key={index}>
                <Text>Person: {index + 1}</Text>
                <TextInput
                    label="Name"
                    // so this throws an typescript error, might need to fix this
                    {...Form.getListInputProps("contactPerson", index, "name")}
                />
                <TextInput
                    label="Role"
                    {...Form.getListInputProps("contactPerson", index, "role")}
                />
                <TextInput
                    label="Email"
                    {...Form.getListInputProps("contactPerson", index, "email")}
                />
                <TextInput
                    label="Phone"
                    {...Form.getListInputProps("contactPerson", index, "phone")}
                />
                <Space h="xl" />
            </Box>
        )
    );

    return (
        <Accordion>
            <Accordion.Item label="Contact Persons">
                {contactPersons}
                <Button
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
            </Accordion.Item>
        </Accordion>
    );
}
