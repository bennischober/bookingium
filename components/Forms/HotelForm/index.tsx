import dayjs from "dayjs";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Button, Space, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CompanyInput } from "../../FormInputs/CompanyInput";
import { HotelEditFormProps, HotelFormProps, HotelFormValues } from "../../../types";

const HotelFormSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export function HotelForm({ handleHotel, close, session }: HotelFormProps) {
    const Form = useForm<HotelFormValues>({
        validate: zodResolver(HotelFormSchema),
        initialValues: {
            name: "",
            notes: "",
            companyName: "",
            vatNumber: "",
            ustNumber: "",
            street: "",
            streetNumber: 0,
            addressSuffix: "",
            zipCode: 0,
            city: "",
            state: "",
            country: "",
            countryCode: "",
            email: "",
            phone: "",
            mobilePhone: "",
            homepage: "",
        },
    });

    const handleSubmit = (values: HotelFormValues) => {
        const hotelData = {
            hotelid: uuidv4(),
            name: values.name,
            notes: values.notes,
            company: {
                name: values.companyName,
                vatNumber: values.vatNumber,
                ustNumber: values.ustNumber,
                address: {
                    streetNumber: values.streetNumber,
                    street: values.street,
                    addressSuffix: values.addressSuffix,
                    zipCode: values.zipCode,
                    city: values.city,
                    state: values.state,
                    country: values.country,
                    countryCode: values.countryCode,
                },
                contact: {
                    email: values.email,
                    phone: values.phone,
                    mobilePhone: values.mobilePhone,
                    homepage: values.homepage,
                },
            },
            dm: {
                userid: session.userid,
                created: dayjs().toISOString(),
                edited: dayjs().toISOString(),
            },
        };
        handleHotel(hotelData);
        if (close) close();
    };

    return (
        <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
            <TextInput label="Name" {...Form.getInputProps("name")} required />
            <TextInput label="Notes" {...Form.getInputProps("notes")} />
            <Space h="xl" />
            <CompanyInput Form={Form} />
            <Button type="submit" fullWidth mt="xl">
                Add Hotel
            </Button>
        </form>
    );
}


export function HotelEditForm({ handleHotel, session, data }: HotelEditFormProps) {
    if(!data || !data.name) return <></>;

    const Form = useForm<HotelFormValues>({
        validate: zodResolver(HotelFormSchema),
        initialValues: {
            name: data.name,
            notes: data.notes,
            companyName: data.companyName,
            vatNumber: data.vatNumber,
            ustNumber: data.ustNumber,
            street: data.street,
            streetNumber: data.streetNumber,
            addressSuffix: data.addressSuffix,
            zipCode: data.zipCode,
            city: data.city,
            state: data.state,
            country: data.country,
            countryCode: data.countryCode,
            email: data.email,
            phone: data.phone,
            mobilePhone: data.mobilePhone,
            homepage: data.homepage,
        },
    });

    const handleSubmit = (values: HotelFormValues) => {
        const hotelData = {
            name: values.name,
            notes: values.notes,
            company: {
                name: values.companyName,
                vatNumber: values.vatNumber,
                ustNumber: values.ustNumber,
                address: {
                    streetNumber: values.streetNumber,
                    street: values.street,
                    addressSuffix: values.addressSuffix,
                    zipCode: values.zipCode,
                    city: values.city,
                    state: values.state,
                    country: values.country,
                    countryCode: values.countryCode,
                },
                contact: {
                    email: values.email,
                    phone: values.phone,
                    mobilePhone: values.mobilePhone,
                    homepage: values.homepage,
                },
            },
            dm: {
                userid: session.userid,
                edited: dayjs().toISOString(),
            },
        };
        handleHotel(hotelData);
    };

    return (
        <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
            <TextInput label="Name" {...Form.getInputProps("name")} required />
            <TextInput label="Notes" {...Form.getInputProps("notes")} />
            <Space h="xl" />
            <CompanyInput Form={Form} />
            <Button type="submit" fullWidth mt="xl">
                Update Hotel Data
            </Button>
        </form>
    );
}
