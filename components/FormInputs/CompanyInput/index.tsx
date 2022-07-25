import { Accordion, TextInput } from "@mantine/core";
import { InputComponentProps } from "../../../types";
import AddressInput from "../AddressInput";
import ContactInput from "../ContactInput";

/**
 * Form needs the following:
 * - companyName
 * - vatNumber
 * - ustNumber
 * - AddressInput, ContactInput props
 */
export function CompanyInput({ Form }: InputComponentProps) {
    return (
        <>
            <Accordion>
                <Accordion.Item value="company">
                    <Accordion.Control>Company</Accordion.Control>
                    <Accordion.Panel>
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
                        </>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="company-address">
                    <Accordion.Control>Company Address</Accordion.Control>
                    <Accordion.Panel>
                        <AddressInput Form={Form} />
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="company-contact">
                    <Accordion.Control>Company Contact</Accordion.Control>
                    <Accordion.Panel>
                        <ContactInput Form={Form} />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </>
    );
}
