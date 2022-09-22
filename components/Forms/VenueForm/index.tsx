import {
    Button,
    Grid,
    NumberInput,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Types } from "mongoose";
import { z } from "zod";
import { useUnsavedWarn } from "../../../hooks";
import { Company } from "../../../models/company";
import { IVenue, Venue } from "../../../models/venue";
import { VenueFormProps } from "../../../types";
import { getFormValueObject } from "../../../utils/appHandles";
import { Searchable } from "../../FormElements/Searchable";

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
}: VenueFormProps) {
    const Form = useForm<Venue>({
        validate: zodResolver(VenueFormSchema),
        initialValues: {
            name: data?.name ?? "",
            capacity: data?.capacity ?? 0,
            notes: data?.notes ?? "",
            company: data?.company ?? ("" as unknown as Types.ObjectId),
        },
    });

    const handleSubmit = (values: Venue) => {
        const created = data?.dm.created ?? "";

        const venueData = getFormValueObject<Venue>(
            values,
            session.userid,
            created,
            {
                createId: "venueid",
                value: data?.venueid,
            }
        ) as IVenue;

        handleData(venueData);
        if (close) close();

        Form.reset();
    };

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
                <Textarea label="Notes" {...Form.getInputProps("notes")} />
                <Space h="xl" />
                <Searchable
                    Form={Form}
                    label="company"
                    inputProps="company"
                    autocomplete={companies ?? []}
                />
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    {data ? "Update Venue" : "Save Venue"}
                </Button>
            </form>
            {prompt}
        </>
    );
}
