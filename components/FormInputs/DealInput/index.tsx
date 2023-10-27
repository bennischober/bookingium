import {
    Box,
    Divider,
    Group,
    NumberInput,
    Select,
    Space,
    Textarea,
    TextInput,
} from "@mantine/core";
import { DateInput, DatePicker, DatePickerInput } from "@mantine/dates";
import { LoproInputProps } from "../../../types";
import { LoproInput } from "../LoproInput";

export function DealInput({ Form, person, company, isEdit }: LoproInputProps) {
    return (
        <Group grow align="top">
            <Box>
                <Textarea
                    label="Deal"
                    placeholder="Deal information"
                    {...Form.getInputProps("deal")}
                    autosize
                    minRows={3}
                    required
                />
                <Space h="xl" />
                <Group grow>
                    <DateInput
                        label="Date"
                        placeholder="Select a date"
                        valueFormat="DD.MM.YYYY"
                        {...Form.getInputProps("date")}
                        required
                    />
                    <Select
                        label="Status"
                        {...Form.getInputProps("status")}
                        data={[
                            {
                                value: "TBC",
                                label: "TBC",
                            },
                            {
                                value: "TBA",
                                label: "TBA",
                            },
                            {
                                value: "FIX",
                                label: "FIX",
                            },
                        ]}
                        required
                    />
                </Group>
                <Space h="xl" />
                <Group grow>
                    <NumberInput
                        label="Ticked VVK Price"
                        leftSection="€"
                        {...Form.getInputProps("ticketPriceVVK")}
                        min={0}
                        required
                    />
                    <NumberInput
                        label="Ticket AK Price"
                        leftSection="€"
                        {...Form.getInputProps("ticketPriceAK")}
                        min={0}
                        required
                    />
                </Group>
                <Space h="xl" />
                <TextInput
                    label="Posters"
                    {...Form.getInputProps("posters")}
                />
                <Space h="xl" />
                <Textarea
                    label="Notes"
                    {...Form.getInputProps("notes")}
                    autosize
                    minRows={3}
                />
                <Divider
                    label="Local Promoter"
                    my="xl"
                    labelPosition="center"
                />
                <LoproInput
                    Form={Form}
                    person={person}
                    company={company}
                    isEdit={isEdit}
                />
            </Box>
        </Group>
    );
}
