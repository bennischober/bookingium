import {
    Button,
    Divider,
    FileInput,
    Group,
    Space,
    Tabs,
    TextInput,
    Textarea,
} from "@mantine/core";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { BankAccountInput } from "../../../components/FormInputs/BankAccountInput";
import AddressInput from "../../../components/FormInputs/AddressInput";
import ContactInput from "../../../components/FormInputs/ContactInput";
import { useForm } from "@mantine/form";
import { MdUpload } from "react-icons/md";
import { Workplace, IWorkplace } from "../../../models/workplace";
import { IUser } from "../../../models/user";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { serverSideFetch } from "../../../utils/appHandles";
import axios from "axios";

interface UserDashboardProps {
    session: any;
    user: IUser;
    workplace: IWorkplace;
}

export default function UserDashboard({
    session,
    user,
    workplace,
}: UserDashboardProps) {
    const Form = useForm<Workplace>({
        initialValues: {
            name: workplace.name || "",
            logo: workplace.logo || "",
            signature: workplace.signature || "",
            notes: workplace.notes || "",
            bank: workplace.bank || {
                bankName: "",
                accountHolder: "",
                iban: "",
                bic: "",
            },
            vatNumber: workplace.vatNumber || "",
            ustNumber: workplace.ustNumber || "",
            address: workplace.address || {
                streetNumber: "",
                street: "",
                addressSuffix: "",
                zipCode: "",
                city: "",
                state: "",
                country: "",
                countryCode: "",
            },
            contact: workplace.contact || {
                email: "",
                phone: "",
                mobilePhone: "",
                otherNumbers: [],
                homepage: "",
            },
        },
    });

    const imageToBase64 = async (image: File) => {
        return await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (value: Workplace) => {
        console.log(value);

        // convert logo (File) to base64 string
        if ((value.logo as unknown) instanceof File) {
            const logo = await imageToBase64(value.logo as unknown as File);
            value.logo = logo;
        }

        if ((value.signature as unknown) instanceof File) {
            const signature = await imageToBase64(
                value.signature as unknown as File
            );
            value.signature = signature;
        }

        console.log(value);

        const res = await axios.put(
            `/api/user/workplace/${workplace._id}`,
            {
                data: value,
            },
            { params: { userid: session.userid } }
        );
    };

    return (
        <>
            <PageTemplate title="User dashboard">
                <FormContainer>
                    <Tabs defaultValue="personal-data">
                        <Tabs.List>
                            <Tabs.Tab value="personal-data">
                                Personal data
                            </Tabs.Tab>
                            {user.role && user.role === "admin" ? (
                                <Tabs.Tab value="company-data">
                                    Company data
                                </Tabs.Tab>
                            ) : null}
                        </Tabs.List>
                        <Tabs.Panel value="personal-data">
                            <></>
                        </Tabs.Panel>
                        {user.role && user.role === "admin" ? (
                            <Tabs.Panel value="company-data">
                                <form
                                    onSubmit={Form.onSubmit((values) =>
                                        handleSubmit(values)
                                    )}
                                >
                                    <TextInput
                                        label="Name"
                                        {...Form.getInputProps("name")}
                                        required
                                    />
                                    <Textarea
                                        label="Notes"
                                        {...Form.getInputProps("notes")}
                                    />

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

                                    <Space h="xl" />

                                    <Group grow>
                                        {workplace.logo ? (
                                            <img
                                                src={workplace.logo}
                                                width="50%"
                                            />
                                        ) : null}
                                        {workplace.signature ? (
                                            <img
                                                src={workplace.signature}
                                                width="50%"
                                            />
                                        ) : null}
                                    </Group>

                                    <Group grow>
                                        <FileInput
                                            label="Company Logo"
                                            placeholder="Upload image"
                                            accept="image/png,image/jpeg"
                                            icon={<MdUpload />}
                                            {...Form.getInputProps("logo")}
                                        />
                                        <FileInput
                                            label="Signature"
                                            placeholder="Upload image"
                                            accept="image/png,image/jpeg"
                                            icon={<MdUpload />}
                                            {...Form.getInputProps("signature")}
                                        />
                                    </Group>

                                    <Divider
                                        my="xl"
                                        label="Bank account"
                                        labelPosition="center"
                                    />
                                    <BankAccountInput
                                        Form={Form}
                                        isEdit={true}
                                    />

                                    <Divider
                                        my="xl"
                                        label="Address"
                                        labelPosition="center"
                                    />
                                    <AddressInput Form={Form} />

                                    <Divider
                                        my="xl"
                                        label="Contact"
                                        labelPosition="center"
                                    />
                                    <ContactInput Form={Form} />

                                    <Space h="xl" />

                                    <Button type="submit" fullWidth mt="xl">
                                        Save
                                    </Button>
                                </form>
                            </Tabs.Panel>
                        ) : null}
                    </Tabs>
                </FormContainer>
            </PageTemplate>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });

    const user = await serverSideFetch<IUser>("/api/user", {
        userid: session?.userid,
    });

    const workplace = await serverSideFetch<IWorkplace>("/api/user/workplace", {
        userid: session?.userid,
    });

    return {
        props: {
            session,
            user,
            workplace,
        },
    };
};
