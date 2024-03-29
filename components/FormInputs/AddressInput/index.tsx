import { Group, Space, TextInput } from "@mantine/core";
import { InputComponentProps } from "../../../types";

// Note: This is no standalone component, this needs to be paired with a functional form component!
export default function AddressInput({ Form }: InputComponentProps) {
    // Future ideas: Add search bar to search for address an get data from api (you enter street, number, city and country, etc. will be filled automatically)

    // old setup for company/normal address!
    const street = "address.street";
    const streetNumber = "address.streetNumber";
    const addressSuffix = "address.addressSuffix";
    const zipCode = "address.zipCode";
    const city = "address.city";
    const state = "address.state";
    const country = "address.country";
    const countryCode = "address.countryCode";

    return (
        <>
            <Group grow>
                <TextInput label="Street" {...Form.getInputProps(street)} />
                <TextInput
                    label="Street number"
                    {...Form.getInputProps(streetNumber)}
                />
                <TextInput
                    label="Address suffix"
                    {...Form.getInputProps(addressSuffix)}
                />
            </Group>
            <Space h="xl" />
            <Group grow>
                <TextInput label="Zip code" {...Form.getInputProps(zipCode)} />
                <TextInput label="City" {...Form.getInputProps(city)} />
                <TextInput label="State" {...Form.getInputProps(state)} />
            </Group>
            <Space h="xl" />
            <Group grow>
                <TextInput label="Country" {...Form.getInputProps(country)} />
                <TextInput
                    label="Country code"
                    {...Form.getInputProps(countryCode)}
                    sx={{ maxWidth: "100px", marginLeft: "auto" }}
                />
            </Group>
        </>
    );
}
