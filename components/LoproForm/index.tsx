import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { z } from "zod";
import { Button, NumberInput, Space, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CompanyInput } from "../CompanyInput";
import { LoproEditFormProps, LoproFormProps, LoproFormValues } from "../../types";

const LoproFormSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    personEmail: z
        .string()
        .email({ message: "Email must be a valid email address" }),
});

export function LoproForm({ handleLopro, close, session }: LoproFormProps) {
    const Form = useForm<LoproFormValues>({
        schema: zodResolver(LoproFormSchema),
        initialValues: {
            name: "",
            personPhone: "",
            personMobilePhone: "",
            personEmail: "",
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

    const handleSubmit = (values: LoproFormValues) => {
        const loproData = {
            _id: new mongoose.Types.ObjectId(),
            loproid: uuidv4(),
            name: values.name,
            phone: values.personPhone,
            mobilePhone: values.personMobilePhone,
            email: values.personEmail,
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
        handleLopro(loproData);
        if (close) close();
    };

    return (
        <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
            <TextInput label="Name" {...Form.getInputProps("name")} required />
            <TextInput label="Phone" {...Form.getInputProps("personPhone")} />
            <TextInput
                label="Mobile Phone"
                {...Form.getInputProps("personMobilePhone")}
            />
            <TextInput
                label="Email"
                {...Form.getInputProps("personEmail")}
                required
            />
            <TextInput label="Notes" {...Form.getInputProps("notes")} />
            <Space h="xl" />
            <CompanyInput Form={Form} />
            <Button type="submit" fullWidth mt="xl">
                Add Lopro
            </Button>
        </form>
    );
}


export function LoproEditForm({handleLopro, session, data}: LoproEditFormProps) {
    const Form = useForm<LoproFormValues>({
        schema: zodResolver(LoproFormSchema),
        initialValues: {
            name: data.name,
            personPhone: data.personPhone,
            personMobilePhone: data.personMobilePhone,
            personEmail: data.personEmail,
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

    const handleSubmit = (values: LoproFormValues) => {
        const loproData = {
            name: values.name,
            phone: values.personPhone,
            mobilePhone: values.personMobilePhone,
            email: values.personEmail,
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
        handleLopro(loproData);
    }


    return (
        <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
            <TextInput label="Name" {...Form.getInputProps("name")} required />
            <TextInput label="Phone" {...Form.getInputProps("personPhone")} />
            <TextInput
                label="Mobile Phone"
                {...Form.getInputProps("personMobilePhone")}
            />
            <TextInput
                label="Email"
                {...Form.getInputProps("personEmail")}
                required
            />
            <TextInput label="Notes" {...Form.getInputProps("notes")} />
            <Space h="xl" />
            <CompanyInput Form={Form} />
            <Button type="submit" fullWidth mt="xl">
                Add Lopro
            </Button>
        </form>
    );
}
