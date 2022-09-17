import { Searchable } from "..";
import { AcComponentsInputProps } from "../../../../types";

export function PersonSearch({ Form, autocomplete }: AcComponentsInputProps) {
    return (
        <Searchable
            label="Person"
            placeholder="Type to search"
            data={autocomplete}
            inputProps="person"
            Form={Form}
            required
        />
    );
}
