import {
    Button,
    Center,
    Divider,
    Group,
    Modal,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Types } from "mongoose";
import { z } from "zod";
import { useUnsavedWarn } from "../../../hooks";
import { getFormValueObject } from "../../../utils/appHandles";
import { CompanyFormProps } from "../../../types";
import { Company, ICompany } from "../../../models/company";
import AddressInput from "../../FormInputs/AddressInput";
import ContactInput from "../../FormInputs/ContactInput";
import { useState } from "react";
import { MemberInput } from "../../FormInputs/MemberInput";

export function CompanyForm({
    handleData,
    close,
    session,
    data,
}: CompanyFormProps) {
    const [opened, setOpened] = useState(false);

    const Form = useForm<Company>({
        initialValues: {
            name: data?.name ?? "",
            notes: data?.notes ?? "",
            vatNumber: data?.vatNumber ?? "",
            ustNumber: data?.ustNumber ?? "",
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
            contact: data?.contact ?? {
                email: "",
                phone: "",
                mobilePhone: "",
                otherNumbers: [],
                homepage: "",
            },
            members: data?.members ?? [],
        },
    });

    const handleSubmit = (values: Company) => {
        const created = data?.dm.created ?? "";

        const vals = getFormValueObject<Company>(
            values,
            session.userid,
            created,
            {
                createId: "companyid",
                value: data?.companyid,
            }
        ) as ICompany;

        handleData(vals);
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
                <Group grow>
                    <TextInput
                        label="VAT Number"
                        {...Form.getInputProps("vatNumber")}
                    />
                    <TextInput
                        label="UST Number"
                        {...Form.getInputProps("ustNumber")}
                    />
                </Group>

                <Divider my="xl" label="Address" labelPosition="center" />
                <AddressInput Form={Form} />

                <Divider my="xl" label="Contact" labelPosition="center" />
                <ContactInput Form={Form} />

                <Divider my="xl" label="Member" labelPosition="center" />
                <Center>
                    <Button onClick={() => setOpened(true)} variant="default">
                        Add Member
                    </Button>
                </Center>

                <Divider my="xl" />
                <Button type="submit" fullWidth mt="xl">
                    Add Company
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
