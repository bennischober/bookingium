import z from "zod";
import {
    Autocomplete,
    Box,
    Button,
    Center,
    Divider,
    Grid,
    Group,
    Modal,
    Space,
    Textarea,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { BandFormProps } from "../../../types";
import { useUnsavedWarn } from "../../../hooks";
import { Band, IBand } from "../../../models/band";
import { Types } from "mongoose";
import { getFormValueObject } from "../../../utils/appHandles";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MemberInput } from "../../FormInputs/MemberInput";

const schema = z.object({
    name: z
        .string()
        .min(3, { message: "Band name must be at least 3 characters" }),
});

export function BandForm({
    handleData,
    close,
    session,
    data,
}: BandFormProps) {
    const [opened, setOpened] = useState(false);

    const Form = useForm<Band>({
        validate: zodResolver(schema),
        initialValues: {
            name: data?.name ?? "",
            notes: data?.notes ?? "",
            company: data?.company ?? ("" as unknown as Types.ObjectId),
            members: data?.members ?? [],
        },
    });

    const handleSubmit = async (values: Band) => {
        const created = data?.dm.created ?? "";

        const bandData = getFormValueObject<Band>(
            values,
            session.userid,
            created,
            {
                createId: "bandid",
                value: data?.bandid,
            }
        ) as IBand;

        handleData(bandData);
        if (close) close();

        Form.reset();
    };

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Band Name"
                    {...Form.getInputProps("name")}
                    required
                />
                <Textarea label="Notes" {...Form.getInputProps("notes")} />
                <Space h="xl" />
                <Group grow align="flex-end">
                    <Autocomplete
                        label="Company"
                        placeholder="Type to search"
                        data={[]}
                        {...Form.getInputProps("company")}
                        required
                    />
                    <Button onClick={() => setOpened(true)} variant="default">
                        Add members
                    </Button>
                </Group>
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    Add Band
                </Button>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size="xl"
                >
                    <MemberInput Form={Form} autocomplete={[]} />
                </Modal>
            </form>
            {prompt}
        </>
    );
}
