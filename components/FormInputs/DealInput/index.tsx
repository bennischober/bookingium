import dayjs from "dayjs";
import {
    Box,
    Group,
    NumberInput,
    Select,
    Space,
    Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { InputComponentProps } from "../../../types";

export function DealInput({ Form: dealForm }: InputComponentProps) {
    return(
        <Group grow align="top">
        <Box>
            <Textarea
                label="Deal"
                placeholder="Deal information"
                {...dealForm.getInputProps("deal")}
                autosize
                minRows={3}
                required
            />
            <Space h="xl" />
            <Group grow>
                <DatePicker
                    id="mantine-2wgfg6a6v"
                    label="Date"
                    defaultValue={dayjs().toDate()}
                    {...dealForm.getInputProps("date")}
                    required
                />
                <Select
                    label="Status"
                    {...dealForm.getInputProps("status")}
                    data={[
                        {
                            value: "pending",
                            label: "Pending",
                        },
                        {
                            value: "accepted",
                            label: "Accepted",
                        },
                        {
                            value: "rejected",
                            label: "Rejected",
                        },
                    ]}
                    required
                />
            </Group>
            <Space h="xl" />
            <Group grow>
                <NumberInput
                    label="Fee"
                    icon="€"
                    {...dealForm.getInputProps("fee")}
                    min={0}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) =>
                        Math.max(1000 / t ** 2, 25)
                    }
                    precision={2}
                    required
                />
                <NumberInput
                    label="Posters"
                    {...dealForm.getInputProps("posters")}
                    min={0}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) =>
                        Math.max(1000 / t ** 2, 25)
                    }
                    required
                />
            </Group>
            <Space h="xl" />
            <Group grow>
                <NumberInput
                    label="Ticked VVK Price"
                    icon="€"
                    {...dealForm.getInputProps(
                        "ticketPriceVVK"
                    )}
                    min={0}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) =>
                        Math.max(1000 / t ** 2, 25)
                    }
                    precision={2}
                    required
                />
                <NumberInput
                    label="Ticket AK Price"
                    icon="€"
                    {...dealForm.getInputProps(
                        "ticketPriceAK"
                    )}
                    min={0}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) =>
                        Math.max(1000 / t ** 2, 25)
                    }
                    precision={2}
                    required
                />
            </Group>
            <Space h="xl" />
            <Textarea
                label="Notes"
                {...dealForm.getInputProps("notes")}
                autosize
                minRows={3}
            />
        </Box>
    </Group>
    );
}