"use client";

import { usePdfStateContext } from "@/app/(main)/provider";
import { Button, Group, NumberInput, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MdFileDownload, MdOutlineSave } from "react-icons/md";

interface ContractPdf {
    information: string;
    amountOfMembers: number;
}

interface ContractPdfFormProps {
    onClose?: () => void;
    onPdfView?: () => void;
}

export function ContractPdfForm({ onClose, onPdfView }: ContractPdfFormProps) {
    const pdf = usePdfStateContext();

    const Form = useForm<ContractPdf>({
        initialValues: {
            information: pdf.state.information || "",
            amountOfMembers: pdf.state.amountOfMembers || 0,
        },
    });

    const handleSubmit = (data: ContractPdf) => {
        pdf.updateContext(data);
        if (onClose) onClose();
    };

    return (
        <form onSubmit={Form.onSubmit((v) => handleSubmit(v))}>
            <Stack>
                <Textarea
                    label="Information"
                    placeholder="Information"
                    {...Form.getInputProps("information")}
                />
                <NumberInput
                    label="Amount of members"
                    placeholder="Amount of members"
                    {...Form.getInputProps("amountOfMembers")}
                />
            </Stack>
            <Group grow justify="center">
                <Button
                    type="submit"
                    onClick={() => {
                        if (onPdfView) onPdfView();
                    }}
                    fullWidth
                    mt="xl"
                >
                    View PDF
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    mt="xl"
                    color="green"
                    leftSection={<MdOutlineSave size={20} />}
                >
                    Save
                </Button>
                <Button
                    type="submit"
                    variant="default"
                    fullWidth
                    mt="xl"
                    leftSection={<MdFileDownload size={20} />}
                >
                    Download PDF
                </Button>
            </Group>
        </form>
    );
}
