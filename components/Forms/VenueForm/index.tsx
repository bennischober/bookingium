import {
    Autocomplete,
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
import { IVenue, Venue } from "../../../models/venue";
import { VenueFormProps } from "../../../types";
import { getFormValueObject } from "../../../utils/appHandles";

const VenueFormSchema = z.object({
    venue: z
        .string()
        .min(3, { message: "Venue name must be at least 3 characters" }),
    capacity: z.number().min(1, { message: "Capacity must be at least 1" }),
});

export function VenueForm({
    handleData,
    close,
    session,
    data,
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
                            label="Venue"
                            {...Form.getInputProps("venue")}
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
                <Autocomplete
                    label="Company"
                    placeholder="Type to search"
                    data={[]}
                    {...Form.getInputProps("company")}
                    required
                />
                <Button type="submit" fullWidth mt="xl">
                    Add Venue
                </Button>
            </form>
            {prompt}
        </>
    );
}
