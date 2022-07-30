import { Group, Space, Text, TextInput } from "@mantine/core";
import { BandMemberInputProps } from "../../../types";

export function BandMemberInput({
    Form: bandForm,
    index,
}: BandMemberInputProps) {
    return (
        <>
            <Text>Member {index + 1}</Text>
            <Group grow>
                <TextInput
                    label="Name"
                    {...bandForm.getInputProps(`members.${index}.name`)}
                />
                <TextInput
                    label="Role"
                    {...bandForm.getInputProps(`members.${index}.role`)}
                />
            </Group>
            <Space h="xl" />
            <Group grow>
                <TextInput
                    label="Email"
                    {...bandForm.getInputProps(`members.${index}.email`)}
                />
                <TextInput
                    label="Phone"
                    {...bandForm.getInputProps(`members.${index}.phone`)}
                />
            </Group>
        </>
    );
}
