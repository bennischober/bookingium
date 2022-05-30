import { Accordion, TextInput } from "@mantine/core";
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
            <Accordion>
                <Accordion.Item label="Company">
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
                </Accordion.Item>
                <Accordion.Item label="Company Address">
                    <AddressInput Form={Form} />
                </Accordion.Item>
                <Accordion.Item label="Company Contact">
                    <ContactInput Form={Form} />
                </Accordion.Item>
            </Accordion>
        </>
    );
}
