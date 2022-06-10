import { NumberInput, TextInput } from "@mantine/core";
import { InputComponentProps } from "../../../types";

// Note: This is no standalone component, this needs to be paired with a functional form component!
export default function AddressInput({ Form }: InputComponentProps<any>) {
    // Future ideas: Add search bar to search for address an get data from api (you enter street, number, city and country, etc. will be filled automatically)
    return (
        <>
            <NumberInput
                label="Street number"
                hideControls
                {...Form.getInputProps("streetNumber")}
            />
            <TextInput label="Street" {...Form.getInputProps("street")} />
            <TextInput
                label="Address suffix"
                {...Form.getInputProps("addressSuffix")}
            />
            <NumberInput
                label="Zip code"
                hideControls
                {...Form.getInputProps("zipCode")}
            />
            <TextInput label="City" {...Form.getInputProps("city")} />
            <TextInput label="State" {...Form.getInputProps("state")} />
            <TextInput label="Country" {...Form.getInputProps("country")} />
            <TextInput
                label="Country code"
                {...Form.getInputProps("countryCode")}
            />
        </>
    );
}
