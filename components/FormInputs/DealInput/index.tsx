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
import { DateInput } from "@mantine/dates";
import { LoproInputProps } from "../../../types";
import { LoproInput } from "../LoproInput";
import { TimePickerInput } from "@/components/Core/Input/TimePickerInput";

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
                <TextInput label="Poster" {...Form.getInputProps("posters")} />
                <Space h="xl" />
                <Textarea
                    label="Notes"
                    {...Form.getInputProps("notes")}
                    autosize
                    minRows={3}
                />
                <Divider label="Performance" my="xl" labelPosition="center" />
                <Group grow>
                    <TextInput
                        label="Performance duration"
                        description="Estimated duration of the performance, example 90 min"
                        {...Form.getInputProps("performanceDuration")}
                    />
                    <TimePickerInput
                        label="Performance time"
                        description="Starting time of the performance, example 21:30"
                        Form={Form}
                        propsName="performanceTime"
                    />
                </Group>
                <Space h="xl" />
                <Textarea
                    label="Performance information"
                    {...Form.getInputProps("performanceInformation")}
                    autosize
                    minRows={3}
                />
                <Divider label="Accommodation" my="xl" labelPosition="center" />
                <Group align="flex-start" grow>
                    <NumberInput
                        label="Amount of People"
                        description="Amount of people that need accommodation"
                        {...Form.getInputProps("amountOfPeople")}
                        min={0}
                    />
                    <Textarea
                        label="Room information"
                        description="Room information, example 2 single rooms, 1 double room"
                        {...Form.getInputProps("roomInformation")}
                        autosize
                        minRows={3}
                    />
                </Group>
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
