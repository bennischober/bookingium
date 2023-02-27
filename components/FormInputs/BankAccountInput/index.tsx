import { Group, Space, TextInput } from "@mantine/core";
import { InputComponentProps } from "../../../types";

export function BankAccountInput({ Form, isEdit }: InputComponentProps) {
    return (
        <>
            <Group grow>
                <TextInput
                    label="Bank Name"
                    {...Form.getInputProps("bank.bankName")}
                />
                <TextInput
                    label="Account Holder"
                    {...Form.getInputProps("bank.accountHolder")}
                />
            </Group>
            <Space h="xl" />
            <Group grow>
                <TextInput
                    label="BIC"
                    {...Form.getInputProps("bank.bic")}
                />
                <TextInput
                    label="IBAN"
                    {...Form.getInputProps("bank.iban")}
                />
            </Group>
        </>
    );
}
