import { Searchable } from "..";
import { AcComponentsInputProps } from "../../../../types";

export function CompanySearch({ Form, autocomplete }: AcComponentsInputProps) {
    return (
        <Searchable
            label="Company"
            placeholder="Type to search"
            data={autocomplete}
            inputProps="company"
            Form={Form}
            required
        />
    );
}
