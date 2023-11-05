"use client";

import z from "zod";
import {
    Button,
    Grid,
    Group,
    Modal,
    Select,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { BandFormProps, SearchableIdProxyData } from "../../../types";
// import { useUnsavedWarn } from "../../../hooks";
import { Band, IBand } from "../../../models/band";
import { Types } from "mongoose";
import { getFormValueObject } from "../../../utils/appHandles";
import { useState } from "react";
import { MemberInput } from "../../FormInputs/MemberInput";
import { SearchableIdProxy } from "../../FormElements/Searchable";
import dayjs from "dayjs";
import { DateInput } from "@mantine/dates";

const schema = z.object({
    name: z
        .string()
        .min(3, { message: "Band name must be at least 3 characters" }),
});

const music_genres = [
    "Alternative",
    "Blues",
    "Classical",
    "Country",
    "Dance",
    "Electronic",
    "Folk",
    "House",
    "Hip Hop",
    "Indie",
    "Jazz",
    "Metal",
    "Opera",
    "Pop",
    "Punk",
    "R&B",
    "Reggae",
    "Rock",
    "Soul",
    "World Music",
];

export function BandForm({
    handleData,
    close,
    session,
    data,
    persons,
    existingMembers,
    companies,
    isEdit,
}: BandFormProps) {
    const [opened, setOpened] = useState(false);

    const Form = useForm<Band>({
        validate: zodResolver(schema),
        initialValues: {
            name: data?.name ?? "",
            genre: data?.genre ?? "",
            founded: data?.founded ? dayjs(data.founded).toDate() : undefined,
            notes: data?.notes ?? "",
            company: data?.company ?? ("" as unknown as Types.ObjectId),
            members: data?.members ?? [],
        },
    });

    const handleSubmit = async (values: Band) => {
        const bandData = getFormValueObject<Band>(
            values,
            session.userid,
            data?.created ?? ""
        ) as IBand;

        handleData(bandData);
        if (close) close();

        Form.reset();
    };

    const companiesAutoComplete: SearchableIdProxyData[] = companies
        ? companies.map((c) => ({
              label: c.name,
              value: c._id,
          }))
        : [];

    // const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Band Name"
                    {...Form.getInputProps("name")}
                    required
                />
                <Space h="xl" />
                <Group grow>
                    <Select
                        label="Genre"
                        {...Form.getInputProps("genre")}
                        data={music_genres}
                        placeholder="Select genre"
                        nothingFoundMessage="Genre not found"
                        searchable
                    />
                    <DateInput
                        label="Founded"
                        placeholder="Select a date"
                        valueFormat="DD.MM.YYYY"
                        {...Form.getInputProps("founded")}
                    />
                </Group>
                <Space h="xl" />
                <Textarea label="Notes" {...Form.getInputProps("notes")} />
                <Space h="xl" />
                <Grid align="flex-end">
                    <Grid.Col span={6}>
                        <SearchableIdProxy
                            Form={Form}
                            label="Company"
                            data={companiesAutoComplete}
                            inputProps="company"
                            isDisabled={isEdit}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button
                            onClick={() => setOpened(true)}
                            variant="default"
                        >
                            {isEdit ? "Edit" : "Add"} Members
                        </Button>
                    </Grid.Col>
                </Grid>
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    {data ? "Update Band" : "Save Band"}
                </Button>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size="xl"
                >
                    <MemberInput
                        Form={Form}
                        isEdit={isEdit}
                        persons={persons}
                        existingMembers={existingMembers}
                    />
                </Modal>
            </form>
            {/* {prompt} */}
        </>
    );
}
