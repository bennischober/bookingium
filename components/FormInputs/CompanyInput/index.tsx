import {
    Button,
    Center,
    Divider,
    Group,
    Modal,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useState } from "react";
import { CompanyInputProps } from "../../../types";
import AddressInput from "../AddressInput";
import ContactInput from "../ContactInput";
import { MemberInput } from "../MemberInput";

export function CompanyInput({ Form, isEdit, persons }: CompanyInputProps) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <TextInput label="Name" {...Form.getInputProps("name")} required />
            <Textarea label="Notes" {...Form.getInputProps("notes")} />
            <Space h="xl" />
            <Group grow>
                <TextInput
                    label="VAT Number"
                    {...Form.getInputProps("vatNumber")}
                />
                <TextInput
                    label="UST Number"
                    {...Form.getInputProps("ustNumber")}
                />
            </Group>

            <Divider my="xl" label="Address" labelPosition="center" />
            <AddressInput Form={Form} />

            <Divider my="xl" label="Contact" labelPosition="center" />
            <ContactInput Form={Form} />

            <Divider my="xl" label="Member" labelPosition="center" />
            <Center>
                <Button onClick={() => setOpened(true)} variant="default">
                    {isEdit ? "Edit Member" : "Add Member"}
                </Button>
            </Center>

            <Divider my="xl" />

            <Modal opened={opened} onClose={() => setOpened(false)} size="xl">
                <MemberInput Form={Form} isEdit={isEdit} persons={persons} />
            </Modal>
        </>
    );
}
