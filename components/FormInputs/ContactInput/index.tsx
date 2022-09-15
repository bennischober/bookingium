import {
    Button,
    Center,
    Divider,
    Grid,
    Group,
    Modal,
    Space,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { CompanyInputComponentProps } from "../../../types";
import { getNestedValue } from "../../../utils/appHandles";

// Note: This is no standalone component, this needs to be paired with a functional form component!
export default function ContactInput({
    Form,
    isCompany,
}: CompanyInputComponentProps) {
    const [opened, setOpened] = useState(false);

    // test, if company contact or normal contact
    const company = isCompany ?? true;

    const email = company ? "company.contact.email" : "contact.email";
    const homepage = company ? "company.contact.homepage" : "contact.homepage";
    const phone = company ? "company.contact.phone" : "contact.phone";
    const mobilePhone = company
        ? "company.contact.mobilePhone"
        : "contact.mobilePhone";
    const otherNumbers = company
        ? "company.contact.otherNumbers"
        : "contact.otherNumbers";

    const otherNums = getNestedValue(Form.values, otherNumbers)?.map(
        (_: any, index: any) => {
            return (
                <>
                    <Grid>
                        <Grid.Col span={5}>
                            <TextInput
                                label="Identifier"
                                {...Form.getInputProps(
                                    `${otherNumbers}.${index}.identifier`
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={5}>
                            <TextInput
                                label="Identifier"
                                {...Form.getInputProps(
                                    `${otherNumbers}.${index}.number`
                                )}
                            />
                        </Grid.Col>
                        <Grid.Col span={2} sx={{ alignSelf: "flex-end" }}>
                            <Button
                                onClick={() =>
                                    Form.removeListItem(otherNumbers, index)
                                }
                                color="red"
                            >
                                <MdDelete />
                            </Button>
                        </Grid.Col>
                    </Grid>
                    <Divider my="xl" />
                </>
            );
        }
    );

    return (
        <>
            <Grid>
                <Grid.Col span={5}>
                    <TextInput label="Phone" {...Form.getInputProps(phone)} />
                </Grid.Col>
                <Grid.Col span={5}>
                    <TextInput
                        label="Mobile phone"
                        {...Form.getInputProps(mobilePhone)}
                    />
                </Grid.Col>
                <Grid.Col span={2} sx={{ alignSelf: "flex-end" }}>
                    <Tooltip label="Add more phone numbers">
                        <Button
                            onClick={() => setOpened(true)}
                            variant="default"
                            sx={{ float: "right" }}
                        >
                            <MdOutlineAdd />
                        </Button>
                    </Tooltip>
                </Grid.Col>
            </Grid>
            <Space h="xl" />
            <Group grow>
                <TextInput label="Email" {...Form.getInputProps(email)} />
                <TextInput label="Homepage" {...Form.getInputProps(homepage)} />
            </Group>
            <Modal opened={opened} onClose={() => setOpened(false)} size="xl">
                {otherNums}
                <Center>
                    <Button
                        onClick={() => {
                            Form.insertListItem(otherNumbers, {
                                identifier: "",
                                number: "",
                            });
                        }}
                        variant="default"
                    >
                        Add number
                    </Button>
                </Center>
            </Modal>
        </>
    );
}
