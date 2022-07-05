import { NumberInput, TextInput } from "@mantine/core";
import { InputComponentProps } from "../../../types";

// Note: This is no standalone component, this needs to be paired with a functional form component!
export default function ContactInput({ Form }: InputComponentProps) {
    return (
        <>
            <TextInput label="Email" {...Form.getInputProps("email")} />
            <TextInput label="Phone" {...Form.getInputProps("phone")} />
            <TextInput
                label="Mobile phone"
                {...Form.getInputProps("mobilePhone")}
            />
            <TextInput label="Homepage" {...Form.getInputProps("homepage")} />
        </>
    );
}
