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
import { BandFormProps } from "../../../types";
import { useUnsavedWarn } from "../../../hooks";
import { Band, IBand } from "../../../models/band";
import { Types } from "mongoose";
import { getFormValueObject } from "../../../utils/appHandles";
import { useState } from "react";
import { MemberInput } from "../../FormInputs/MemberInput";
import { CompanySearch } from "../../FormElements/Searchable/Company";

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
    companies,
}: BandFormProps) {
    const [opened, setOpened] = useState(false);

    const Form = useForm<Band>({
        validate: zodResolver(schema),
        initialValues: {
            name: data?.name ?? "",
            genre: data?.genre ?? "",
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
                <Group grow>
                    <TextInput
                        label="Band Name"
                        {...Form.getInputProps("name")}
                        required
                    />
                    <Select
                        label="Genre"
                        {...Form.getInputProps("genre")}
                        data={music_genres}
                        placeholder="Select genre"
                        nothingFound="Genre not found"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => {
                            music_genres.push(query);
                            Form.setFieldValue("genre", query);
                        }}
                    />
                </Group>
                <Textarea label="Notes" {...Form.getInputProps("notes")} />
                <Space h="xl" />
                <Grid align="flex-end">
                    <Grid.Col span={6}>
                        {/*If in "edit mode", add button with link to update company/members? or with modal? or inline? */}
                        <CompanySearch
                            Form={Form}
                            autocomplete={companies ?? []}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button
                            onClick={() => setOpened(true)}
                            variant="default"
                        >
                            Add members
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
                    <MemberInput Form={Form} autocomplete={persons ?? []} />
                </Modal>
            </form>
            {prompt}
        </>
    );
}
