import { TextInput } from "@mantine/core";
import { InputComponentProps } from "../../types";
import AddressInput from "../AddressInput";
import ContactInput from "../ContactInput";

/**
 * Form needs the following:
 * - companyName
 * - vatNumber
 * - ustNumber
 * - AddressInput, ContactInput props
 */
export function CompanyInput({ Form }: InputComponentProps<any>) {
    return (
        <>
            <TextInput
                label="Company Name"
                {...Form.getInputProps("companyName")}
            />
            <TextInput
                label="VAT Number"
                {...Form.getInputProps("vatNumber")}
            />
            <TextInput
                label="UST Number"
                {...Form.getInputProps("ustNumber")}
            />
            <AddressInput Form={Form} />
            <ContactInput Form={Form} />
        </>
    );
}
