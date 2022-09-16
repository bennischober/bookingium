import {
    Button,
    Center,
    Divider,
    Grid,
    Group,
    Modal,
    Paper,
    Space,
    TextInput,
    Tooltip,
} from "@mantine/core";
import React, { useState } from "react";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { InputComponentProps } from "../../../types";
import { getNestedValue } from "../../../utils/appHandles";

// Note: This is no standalone component, this needs to be paired with a functional form component!
export default function ContactInput({
    Form,
}: InputComponentProps) {
    const [opened, setOpened] = useState(false);


    const email = "contact.email";
    const homepage = "contact.homepage";
    const phone = "contact.phone";
    const mobilePhone = "contact.mobilePhone";
    const otherNumbers = "contact.otherNumbers";

    const otherNums = getNestedValue(Form.values, otherNumbers)?.map(
        (_: any, index: any) => {
            return (
                <Paper key={index}>
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
                                label="Number"
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
                </Paper>
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
