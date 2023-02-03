import {
    Box,
    Divider,
    Group,
    NumberInput,
    Select,
    Space,
    Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { LoproInputProps } from "../../../types";
import { LoproInput } from "../LoproInput";

export function DealInput({ Form, person, company }: LoproInputProps) {
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
                    <DatePicker
                        id="mantine-2wgfg6a6v"
                        label="Date"
                        placeholder="Select a date"
                        allowFreeInput
                        clearable={false}
                        inputFormat="DD.MM.YYYY"
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
                        icon="€"
                        {...Form.getInputProps("ticketPriceVVK")}
                        min={0}
                        stepHoldDelay={500}
                        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                        precision={2}
                        required
                    />
                    <NumberInput
                        label="Ticket AK Price"
                        icon="€"
                        {...Form.getInputProps("ticketPriceAK")}
                        min={0}
                        stepHoldDelay={500}
                        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                        precision={2}
                        required
                    />
                </Group>
                <Space h="xl" />
                <NumberInput
                    label="Posters"
                    {...Form.getInputProps("posters")}
                    min={0}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    required
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
                />
            </Box>
        </Group>
    );
}
