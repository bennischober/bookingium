import { z } from "zod";
import {
    Autocomplete,
    Button,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { HotelFormProps } from "../../../types";
import { useUnsavedWarn } from "../../../hooks";
import { Hotel, IHotel } from "../../../models/hotel";
import { Types } from "mongoose";
import { getFormValueObject } from "../../../utils/appHandles";

const HotelFormSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export function HotelForm({
    handleData: handleHotel,
    close,
    session,
    data,
}: HotelFormProps) {
    const Form = useForm<Hotel>({
        validate: zodResolver(HotelFormSchema),
        initialValues: {
            name: data?.name ?? "",
            notes: data?.notes ?? "",
            company: data?.company ?? ("" as unknown as Types.ObjectId),
        },
    });

    const handleSubmit = (values: Hotel) => {
        const created = data?.dm.created ?? "";

        const hotelData = getFormValueObject<Hotel>(
            values,
            session.userid,
            created,
            {
                createId: "hotelid",
                value: data?.hotelid,
            }
        ) as IHotel;

        handleHotel(hotelData);
        if (close) close();

        Form.reset();
    };

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Name"
                    {...Form.getInputProps("name")}
                    required
                />
                <Textarea label="Notes" {...Form.getInputProps("notes")} />
                <Space h="xl" />
                <Autocomplete
                    label="Company"
                    placeholder="Type to search"
                    data={[]}
                    {...Form.getInputProps("company")}
                    required
                />
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    Add Hotel
                </Button>
            </form>
            {prompt}
        </>
    );
}
