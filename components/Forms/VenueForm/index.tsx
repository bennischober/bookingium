"use client";

import {
    Button,
    Grid,
    Modal,
    NumberInput,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Types } from "mongoose";
import { useState } from "react";
import { z } from "zod";
import { useUnsavedWarn } from "../../../hooks";
import { IVenue, Venue } from "../../../models/venue";
import { SearchableIdProxyData, VenueFormProps } from "../../../types";
import { getFormValueObject } from "../../../utils/appHandles";
import { SearchableIdProxy } from "../../FormElements/Searchable";
import { MemberInput } from "../../FormInputs/MemberInput";
import { LeftAlignGroup } from "../../Layout/LeftAlignGroup";

const VenueFormSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Venue name must be at least 3 characters" }),
    capacity: z.number().min(1, { message: "Capacity must be at least 1" }),
});

export function VenueForm({
    handleData,
    close,
    session,
    data,
    companies,
    persons,
    isEdit,
}: VenueFormProps) {
    const [opened, setOpened] = useState(false);

    const Form = useForm<Venue>({
        validate: zodResolver(VenueFormSchema),
        initialValues: {
            name: data?.name ?? "",
            capacity: data?.capacity ?? 0,
            notes: data?.notes ?? "",
            company: data?.company ?? ("" as unknown as Types.ObjectId),
            members: data?.members ?? [],
        },
    });

    const handleSubmit = (values: Venue) => {
        const created = data?.created ?? "";

        const venueData = getFormValueObject<Venue>(
            values,
            session.userid,
            created
        ) as IVenue;

        handleData(venueData);
        if (close) close();

        Form.reset();
    };

    const companieAutoComplete: SearchableIdProxyData[] = companies?.map(
        (c) => ({
            label: c.name,
            value: c._id,
        })
    ) ?? [];

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <Grid grow>
                    <Grid.Col span={4}>
                        <TextInput
                            label="Name"
                            {...Form.getInputProps("name")}
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Capacity"
                            {...Form.getInputProps("capacity")}
                            required
                        />
                    </Grid.Col>
                </Grid>
                <Space h="xl" />
                <Textarea label="Notes" {...Form.getInputProps("notes")} />
                <Space h="xl" />
                <LeftAlignGroup
                    first={
                        <SearchableIdProxy
                            Form={Form}
                            label="Company"
                            inputProps="company"
                            data={companieAutoComplete}
                        />
                    }
                    second={
                        <Button
                            onClick={() => setOpened(true)}
                            variant="default"
                        >
                            Add members
                        </Button>
                    }
                />
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    {data ? "Update Venue" : "Save Venue"}
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
                    />
                </Modal>
            </form>

            {prompt}
        </>
    );
}
