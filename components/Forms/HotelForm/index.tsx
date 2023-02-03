import { z } from "zod";
import { Button, Divider, Space, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { HotelFormProps } from "../../../types";
import { useUnsavedWarn } from "../../../hooks";
import { Hotel, IHotel } from "../../../models/hotel";
import { getFormValueObject } from "../../../utils/appHandles";
import AddressInput from "../../FormInputs/AddressInput";
import ContactInput from "../../FormInputs/ContactInput";

const HotelFormSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export function HotelForm({
    handleData,
    close,
    session,
    data,
}: HotelFormProps) {
    const Form = useForm<Hotel>({
        validate: zodResolver(HotelFormSchema),
        initialValues: {
            name: data?.name ?? "",
            notes: data?.notes ?? "",
            contact: data?.contact ?? {
                email: "",
                phone: "",
                mobilePhone: "",
                otherNumbers: [],
                homepage: "",
            },
            address: data?.address ?? {
                streetNumber: "",
                street: "",
                addressSuffix: "",
                zipCode: "",
                city: "",
                state: "",
                country: "",
                countryCode: "",
            },
        },
    });

    const [prompt] = useUnsavedWarn(Form);

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
        console.log(hotelData);

        handleData(hotelData);
        if (close) close();

        Form.reset();
    };

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Name"
                    {...Form.getInputProps("name")}
                    required
                />
                <Textarea label="Notes" {...Form.getInputProps("notes")} />
                <Divider my="xl" label="Address" labelPosition="center" />
                <AddressInput Form={Form} />
                <Divider my="xl" label="Contact" labelPosition="center" />
                <ContactInput Form={Form} />
                <Space h="xl" />
                <Button type="submit" fullWidth mt="xl">
                    {data ? "Update Hotel" : "Save Hotel"}
                </Button>
            </form>
            {prompt}
        </>
    );
}
